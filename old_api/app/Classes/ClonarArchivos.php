<?php

namespace App\Classes;

use App\Models\Archivo;
use App\Models\BancoArchivos;
use App\Services\BancoArchivosService;
use Aws\S3\S3Client;
use Carbon\Carbon;
use Illuminate\Support\Str;

class ClonarArchivos
{
    protected $s3Client = null;
    protected $bucket = '';
    protected $prefijo = '';
    protected $s3prefix = '';
    public function __construct()
    {
        $this->s3Client = new S3Client([
            'version' => 'latest',
            'region' => env('AWS_DEFAULT_REGION'),
            'credentials' => [
                'key' => env('AWS_ACCESS_KEY_ID'),
                'secret' => env('AWS_SECRET_ACCESS_KEY')
            ]
        ]);
        $this->bucket = env('AWS_BUCKET');
        $this->prefijo = env('AWS_BUCKET_BANCO_ARCHIVOS_PREFIX');
        $this->s3prefix = "s3://" . $this->bucket . "/" . "$this->prefijo/";
        $this->s3Client->registerStreamWrapper();
    }

    public function actualizarArchivosContenidos($contenido,$archivosModificados){
        if ($contenido->contenido)
            foreach ($contenido->contenido as &$elemento) {
                if ($elemento)
                    switch ($elemento['tipo_elemento']) {
                        case 'Archivo':
                            $this->actualizarElementoArchivo($elemento,$archivosModificados);
                            break;
                        case 'Tabla':
                            $this->actualizarElementoTabla($elemento,$archivosModificados);
                            break;
                        case 'Formulario':
                            $this->actualizarElementoFormulario($elemento,$archivosModificados);
                            break;
                        case 'Plantilla genérica':
                            foreach ($elemento['campos'] as &$campo) {
                                if ($campo['type'] === 'bancoArchivos') {
                                    $this->actualizarElementoBancoArchivos($campo,$archivosModificados);
                                }
                            }
                            break;
                        default:
                            break;
                    }
            }

        //revisamos tabla_adicional
        if (isset($contenido->tabla_adicional) && isset($contenido->tabla_adicional['tabla'])) {
            $tablaAdicionalElemento = ['campos' => $contenido->tabla_adicional['tabla']];
            $this->actualizarElementoTabla($tablaAdicionalElemento, $archivosModificados);
            $contenido->tabla_adicional['tabla'] = $tablaAdicionalElemento['campos'];
        }
        //revisamos tabla_historica
        if (isset($contenido->tabla_historica) && isset($contenido->tabla_historica['filas'])) {
            $tablaHistoricaElemento = ['campos' => $contenido->tabla_historica];
            $this->actualizarElementoTabla($tablaHistoricaElemento, $archivosModificados);
            $contenido->tabla_historica = $tablaHistoricaElemento['campos'];
        }
        return $contenido;
    }

    private function procesarArchivosContenido($contenido, $archivosClonados){
        $idsArchivos = $archivosClonados;
        if ($contenido->contenido)
            foreach ($contenido->contenido as $elemento) {
                if ($elemento) {
                    switch ($elemento['tipo_elemento']) {
                        case 'Archivo':
                            $idsArchivos = array_merge($idsArchivos, $this->procesarElementoArchivo($elemento));
                            break;
                        case 'Tabla':
                            $idsArchivos = array_merge($idsArchivos, $this->procesarElementoTabla($elemento));
                            break;
                        case 'Formulario':
                            $idsArchivos = array_merge($idsArchivos, $this->procesarElementoFormulario($elemento));
                            break;
                        case 'Plantilla genérica':
                            foreach ($elemento['campos'] as $campo) {
                                if ($campo['type'] === 'bancoArchivos') {
                                    $idsArchivos = array_merge($idsArchivos, $this->procesarElementoBancoArchivos($campo));
                                }
                            }
                            break;
                        default:
                            break;
                    }
                }
            }
        //revisamos tabla_adicional
        if (isset($contenido->tabla_adicional) && isset($contenido->tabla_adicional['tabla'])) {
            $elemento = ['campos' => $contenido->tabla_adicional['tabla']];
            $idsArchivos = array_merge($idsArchivos, $this->procesarElementoTabla($elemento));
        }
        //revisamos tabla_historica
        if (isset($contenido->tabla_historica) && isset($contenido->tabla_historica['filas'])) {
            $elemento = ['campos' => $contenido->tabla_historica];
            $idsArchivos = array_merge($idsArchivos,$this->procesarElementoTabla($elemento));
        }
        return $idsArchivos;
    }

    public function ClonarArchivosContenido($contenido,$dependencia,$nuevoContenido,$archivosClonados,$extraData){
        $idsArchivos = $this->procesarArchivosContenido($contenido,$archivosClonados);
        $idsArchivos = array_merge($idsArchivos,$contenido->bancoArchivos->where('dependencia_id',$dependencia->id)->pluck('id')->toArray());
        $idsArchivos = array_merge($idsArchivos,$contenido->archivosOriginales->where('dependencia_id',$dependencia->id)->pluck('id')->toArray());
        //teniendo los archivos los buscamos en el banco de archivos para procesarlos
        $archivosProcesar = BancoArchivos::find($idsArchivos);
        \log::info($archivosProcesar);
        $nuevosArchivos = $archivosProcesar->map(function($archivo) use ($dependencia,$nuevoContenido, $extraData){
            return $this->clonarArchivo($archivo,$dependencia,$nuevoContenido,$extraData['categoria']);
        });

        $relacion_anterior_nuevos = [];
        foreach ($nuevosArchivos as $nuevoArchivo){
            try{
                $relacion_anterior_nuevos[$nuevoArchivo->id_anterior] = $nuevoArchivo->id;
                if(file_exists("$this->s3prefix$nuevoArchivo->previous_object_key")){
                    $this->s3Client->copyObject([
                        'Bucket'     => $this->bucket,
                        'Key'        => "$this->prefijo/$nuevoArchivo->object_key",
                        'CopySource' => "$this->bucket/$this->prefijo/$nuevoArchivo->previous_object_key",
                    ]);
                }else{
                    \log::info('No se encontró el archivo que se quiere copiar');
                }
            }catch(\Exception $e){
                \Log::info($e);
            }
        }

        $contenido = $this->actualizarArchivosContenidos($nuevoContenido,$relacion_anterior_nuevos);
        //utilizamos save quitely para no ejecutar observers
        $contenido->save();
        //generamos relaciones con el modelo
        BancoArchivosService::asociarArchivosModelo($contenido);
        return [
            'nuevos_archivos' => $nuevosArchivos,
            'relacion_anterior_nuevo' => $relacion_anterior_nuevos,
            'archivos_clonados' => $idsArchivos,
            'contenidoActualizado' => $contenido,
        ];

    }

    public function procesarArchivosDependencia($contenido,$dependencia,$nuevoContenido,$archivosClonados,$extraData){
        $idsArchivos = $this->procesarArchivosContenido($contenido,$archivosClonados);
        $idsArchivos = array_merge($idsArchivos,$contenido->bancoArchivos->where('dependencia_id',$dependencia->id)->pluck('id')->toArray());
        $idsArchivos = array_merge($idsArchivos,$contenido->archivosOriginales->where('dependencia_id',$dependencia->id)->pluck('id')->toArray());
        $archivosProcesar = BancoArchivos::find($idsArchivos);
        $nuevosArchivos = $archivosProcesar->map(function($archivo) use($dependencia,$nuevoContenido,$extraData){
            //primero revisamos si es reestructura
            if($archivo->categoria === 'reestructura'){
                //si el tipo es reestructura se queda con la misma información
                $archivo->id_anterior = $archivo->id;
                return $archivo;
            }

            if($archivo->tipo === 'particular'){
                //si es particular cambiamos su categoria;
                $archivo->categoria = $extraData['categoria'];
                $archivo->contenido_id = $nuevoContenido->id;
                $archivo->contenido_type = get_class($nuevoContenido);
                $archivo->save();
                $archivo->id_anterior = $archivo->id;
                return $archivo;
            }

            if($archivo->tipo === 'general'){
                //al general dejamos que sea de parte de gob del estado para que no pierdan la referencia las demás dependencias
                $archivo->dependencia_id = $extraData['id_gob_estado'];
                $archivo->contenido_id = null;
                $archivo->contenido_type = null;
                $archivo->save();
                //si es general lo clonamos
                return $this->clonarArchivo($archivo,$dependencia,$nuevoContenido,$extraData['categoria']);
            }
        });
        $relacion_anterior_nuevos = [];
        foreach ($nuevosArchivos as $nuevoArchivo){
            $relacion_anterior_nuevos[$nuevoArchivo->id_anterior] = $nuevoArchivo->id;
            //significa que tenemos que clonar el archivo;
            if(isset($nuevoArchivo->previous_object_key)){
                try{
                    $relacion_anterior_nuevos[$nuevoArchivo->id_anterior] = $nuevoArchivo->id;
                    if(file_exists("$this->s3prefix$nuevoArchivo->previous_object_key")){
                        $this->s3Client->copyObject([
                            'Bucket'     => $this->bucket,
                            'Key'        => "$this->prefijo/$nuevoArchivo->object_key",
                            'CopySource' => "$this->bucket/$this->prefijo/$nuevoArchivo->previous_object_key",
                        ]);
                    }else{
                        \log::info('No se encontró el archivo que se quiere copiar');
                    }
                }catch(\Exception $e){
                    \Log::info($e);
                }
            }
        }
        $contenido = $this->actualizarArchivosContenidos($nuevoContenido,$relacion_anterior_nuevos);
        //utilizamos save quitely para no ejecutar observers
        $contenido->save();
        //generamos relaciones con el modelo
        BancoArchivosService::asociarArchivosModelo($contenido);
        return [
            'nuevos_archivos' => $nuevosArchivos,
            'relacion_anterior_nuevo' => $relacion_anterior_nuevos,
            'archivos_clonados' => $idsArchivos,
            'contenidoActualizado' => $contenido,
        ];
    }
    private function clonarArchivo($archivo, $dependencia, $nuevoContenido, $categoria){
        //para los archivos que se heredan la regla es:
        //su dependencia es la que sufre el snapshot
        //el contenido original es el contenido al que pertenece el snapshot
        //el archivo clonado se pasa a ser reestructurado
        $fecha = Carbon::now()->toDateTimeString();
        $prefijo_nombre_original = $fecha . "_" . $dependencia->id . "_" . $nuevoContenido->id . "_";
        $nuevoArchivo = $archivo->replicate()->fill([
            'dependencia_id' => $dependencia->id,
            'contenido_id' => $nuevoContenido->id,
            'contenido_type' => get_class($nuevoContenido),
            'tipo' => 'particular',
            'nombre_original' => $prefijo_nombre_original.$archivo->nombre_original,
            'object_key' => $this->generateObjectKey(),
            'categoria' => $categoria
        ]);
        $nuevoArchivo->save();
        $nuevoArchivo->previous_object_key = $archivo->object_key;
        $nuevoArchivo->id_anterior = $archivo->id;
        return $nuevoArchivo;
    }

    private function generateObjectKey(){
        return Str::uuid();
    }
    private function procesarElementoArchivo($elemento){
        if (!isset($elemento['campos']['archivos'])) {
            return;
        }
        $idsArchivos = [];
        foreach ($elemento['campos']['archivos'] as $archivo) {
            if (isset($archivo['id']))
                in_array($archivo['id'], $idsArchivos) || $idsArchivos[] = (int)$archivo['id'];
            else
                in_array($archivo, $idsArchivos) || $idsArchivos[] = (int)$archivo;
        }
        return $idsArchivos;
    }

    private function procesarElementoTabla($elemento){
        $idsArchivos = [];
        if (!isset($elemento['campos']['filas'])) {
            return [];
        }

        foreach ($elemento['campos']['filas'] as &$columnas) {
            foreach ($columnas as $columna) {
                if (isset($columna['archivos'])) {
                    foreach ($columna['archivos'] as $archivo) {
                        if (isset($archivo['id']))
                            in_array($archivo['id'], $idsArchivos) || $idsArchivos[] = (int)$archivo['id'];
                        else
                            in_array($archivo, $idsArchivos) || $idsArchivos[] = (int)$archivo;
                    }
                }
            }
        }
        return $idsArchivos;
    }

    private function procesarElementoFormulario($elemento){
        $idsArchivos = [];
        foreach ($elemento['campos'] as &$pregunta) {
            if (isset($pregunta['archivos'])) {
                $idsArchivos = [];
                foreach ($pregunta['archivos'] as $archivo) {
                    if (isset($archivo['id']))
                        in_array($archivo['id'], $idsArchivos) || $idArchivosRelacionados[] = (int)$archivo['id'];
                    else
                        in_array($archivo, $idsArchivos) || $idArchivosRelacionados[] = (int)$archivo;
                }
            }
        }
        return $idsArchivos;
    }

    private function procesarElementoBancoArchivos($campo){
        $idsArchivos = [];
        foreach ($campo['data']['archivos'] as $archivo){
            if (isset($archivo['id']))
                in_array($archivo['id'], $idsArchivos) || $idsArchivos[] = (int)$archivo['id'];
            else
                in_array($archivo, $idsArchivos) || $idsArchivos[] = (int)$archivo;
        }
        return $idsArchivos;
    }

    private function actualizarElementoArchivo(&$elemento, $archivosModificados){
        if (!isset($elemento['campos']['archivos'])) {
            return;
        }
        $idsArchivos = [];
        foreach ($elemento['campos']['archivos'] as &$archivo) {
            if (isset($archivo['id']))
                array_key_exists($archivo['id'], $archivosModificados) && $idsArchivos[] = (int)$archivosModificados[$archivo['id']];
            else
                array_key_exists($archivo, $archivosModificados) && $idsArchivos[] = (int)$archivosModificados[$archivo];
        }
        $elemento['campos']['archivos'] = $idsArchivos;
    }

    private function actualizarElementoTabla(&$elemento, $archivosModificados){
        if (!isset($elemento['campos']['filas'])) {
            return;
        }

        foreach ($elemento['campos']['filas'] as &$columnas) {
            foreach ($columnas as &$columna) {
                if (isset($columna['archivos'])) {
                    $idsArchivos = [];
                    foreach ($columna['archivos'] as $archivo) {
                        if (isset($archivo['id']))
                            array_key_exists($archivo['id'], $archivosModificados) && $idsArchivos[] = (int)$archivosModificados[$archivo['id']];
                        else
                            array_key_exists($archivo, $archivosModificados) && $idsArchivos[] = (int)$archivosModificados[$archivo];
                    }
                    $columna['archivos'] = $idsArchivos;
                }
            }
        }
    }

    private function actualizarElementoFormulario(&$elemento, $archivosModificados){
        foreach ($elemento['campos'] as &$pregunta) {
            if (isset($pregunta['archivos'])) {
                $idsArchivos = [];
                foreach ($pregunta['archivos'] as &$archivo) {
                    if (isset($archivo['id']))
                        array_key_exists($archivo['id'], $archivosModificados) && $idArchivosRelacionados[] = (int)$archivosModificados[$archivo['id']];
                    else
                        array_key_exists($archivo, $archivosModificados) && $idArchivosRelacionados[] = (int)$archivosModificados[$archivo];
                }
                $pregunta['archivos'] = $idsArchivos;
            }
        }
    }

    private function actualizarElementoBancoArchivos(&$campo, $archivosModificados){
        $idsArchivos = [];
        foreach ($campo['data']['archivos'] as &$archivo){
            if (isset($archivo['id']))
                array_key_exists($archivo['id'], $archivosModificados) && $idsArchivos[] = (int)$archivosModificados[$archivo['id']];
            else
                array_key_exists($archivo, $archivosModificados) && $idsArchivos[] = (int)$archivosModificados[$archivo];
        }
        $campo['data']['archivos'] = $idsArchivos;
    }
}
