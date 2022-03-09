<?php

namespace App\Classes;
use Illuminate\Support\Collection;
use Carbon\Carbon;
use Illuminate\Support\Arr;

class Utilities
{

    public static function getFileExtension($file_name)
    {
        $n = strrpos($file_name, ".");
        if ($n === false) return "";
        return substr($file_name, $n + 1);
    }

    public static function integerToRoman($integer)
    {
        // Convert the integer into an integer (just to make sure)
        $integer = intval($integer);
        $result = '';

        // Create a lookup array that contains all of the Roman numerals.
        $lookup = array('M' => 1000,
            'CM' => 900,
            'D' => 500,
            'CD' => 400,
            'C' => 100,
            'XC' => 90,
            'L' => 50,
            'XL' => 40,
            'X' => 10,
            'IX' => 9,
            'V' => 5,
            'IV' => 4,
            'I' => 1);

        foreach ($lookup as $roman => $value) {
            // Determine the number of matches
            $matches = intval($integer / $value);

            // Add the same number of characters to the string
            $result .= str_repeat($roman, $matches);

            // Set the integer to be the remainder of the integer and the value
            $integer = $integer % $value;
        }

        // The Roman numeral should be built, return it
        return $result;
    }

    public function emptyArray($array, $ignoreKeys = ['id', 'se_justifica'])
    {
        $mixed = $array;
        if (is_object($array)) {
            $mixed = (array)$array;
        }

        if (is_array($mixed)) {
            foreach ($mixed as $key => $value) {
                //ignoramos ids por default
                if (array_search($key, $ignoreKeys)) {
                    if($key === 'se_justifica'){
                        continue;
                    }
                    return true;
                }
                if (!$this->emptyArray($value)) {
                    return false;
                }
            }
        } elseif (!empty($mixed)) {
            return false;
        }
        return true;
    }

    public function getMessageErrors()
    {
        return [
            'required' => 'El campo :attribute es obligatorio.',
            'required_if' => 'El campo :attribute es obligatorio cuando :other es :value.',
            'numeric' => 'El campo :attribute tiene que ser un número.',
            'min' => [
                'numeric' => 'El campo :attribute debe ser al menos :min',
                'string' => 'El campo :attribute debe tener al menos :min caracteres.',
            ],
            'string' => 'El campo :attribute debe ser una cadena de texto.',
            'max' => [
                'numeric' => 'El campo :attribute no puede ser mayor que :max.',
                'string' => 'El campo :attribute no puede ser mayor que :max caracteres.',
            ],
            'size' => [
                'numeric' => 'El campo :attribute debe ser :size.',
                'string' => 'El campo :attribute debe ser de :size caracteres.',
            ],
            'before_or_equal' => 'El campo :attribute debe ser menor o igual a: :date',
            'after_or_equal' => 'El campo :attribute debe ser mayor o igual a :date',
            'date' => 'El campo :attribute no es una fecha válida.',
            'date_format' => 'El campo :attribute no coincide con el formato :format.',
            'in' => 'El campo :attribute no es valido.',
            'email' => 'El campo :attribute debe ser una dirección de correo electrónico válida.',
            'exists' => 'El :attribute seleccionado no es válido.',
            'unique' => 'El :attribute ya ha sido tomado.',
            'regex' => 'El formato de :attribute es inválido.',
            'confirmed' => 'El campo :attribute confirmation no coincide.',
            'boolean' => "El campo :attribute debe de ser true, false, 1, 0, '1' o '0'.",
            'array' => "El campo :attribute debe de ser un array.",
            'file' => 'El campo :attribute debe ser un archivo.',
            'mimes' => 'El campo :attribute debe ser un archivo de tipo: :values.',
            'mimetypes' => 'El campo :attribute debe ser un archivo de tipo: :values.',
            'accepted' => 'El campo :attribute debe estar activado.'
        ];
    }

    public function cleanKeys($arrayClean, $arrayCheck)
    {
        return array_intersect_key($arrayClean, $arrayCheck);
    }

    public function cleanEmptysAndNULLKeys($arrayClean)
    {
        $arrayClean = $this->trimArray($arrayClean);
        $arrayClean = array_filter($arrayClean, function ($value) {
            if ($value === false || $value === 0 || $value === "0")
                return true;
            return !is_null($value) && $value !== '' && !empty($value);
        });
        return $arrayClean;
    }

    public function trimArray($arrayClean)
    {
        foreach ($arrayClean as $key => $val) {
            if (is_string($val))
                $arrayClean[$key] = trim($val);
            if ($val === "false")
                $arrayClean[$key] = false;
            if ($val === "true")
                $arrayClean[$key] = true;
            if (is_array($val))
                $arrayClean[$key] = $this->trimArray($val);
        }
        return $arrayClean;
    }

    public function changeStringsNullsToNull($array)
    {
        return collect($array)->map(function ($value, $key) {
            if (is_string($value)) {
                if ($value === '' || empty($value)) {
                    return null;
                }
                return $value;
            }
            return $value;
        })->all();
    }

    public function getDayDiff($start_day, $end_day)
    {
        $start = Carbon::parse($start_day)->startOfDay();
        $end = Carbon::parse($end_day)->startOfDay();
        return $end->diffInDays($start);
    }

    public function generateRandomPassword()
    {
        $caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#%^&*()_,./<>?;:[]{}\|=+';
        $randomPassword = '';
        $limit = strlen($caracteres) - 1;
        for ($i = 0; $i < 8; $i++) {
            $randomPassword .= $caracteres[rand(0, $limit)];
        }
        return $randomPassword;
    }

    public function generateRandomUser()
    {
        $caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        $randomUserName = '';
        $limit = strlen($caracteres) - 1;
        for ($i = 0; $i < random_int(8, 25); $i++) {
            $randomUserName .= $caracteres[rand(0, $limit)];
        }
        return $randomUserName;
    }

    public function generateRandomString($length = 1)
    {
        $caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        $randomString = '';
        $limit = strlen($caracteres) - 1;
        for ($i = 0; $i < $length; $i++) {
            $randomString .= $caracteres[random_int(0, $limit)];
        }
        return $randomString;
    }

    function humanFileSize($size, $unit = "")
    {
        if ((!$unit && $size >= 1 << 30) || $unit === "GB")
            return number_format($size / (1 << 30), 2) . "GB";
        if ((!$unit && $size >= 1 << 20) || $unit === "MB")
            return number_format($size / (1 << 20), 2) . "MB";
        if ((!$unit && $size >= 1 << 10) || $unit === "KB")
            return number_format($size / (1 << 10), 2) . "KB";
        return number_format($size) . " bytes";
    }

    function getIdsArchivosRelacionados($contenido)
    {
        $idArchivosRelacionados = [];
        foreach ($contenido as $key => $elemento) {
            if(isset($elemento['tipo_elemento'])) {
                switch ($elemento['tipo_elemento']) {
                    case 'Archivo':
                        if (!isset($elemento['campos']['archivos'])) {
                            break;
                        }

                        foreach ($elemento['campos']['archivos'] as $archivo) {
                            if (isset($archivo['id']))
                                in_array($archivo['id'], $idArchivosRelacionados, true) || $idArchivosRelacionados[] = (int)$archivo['id'];
                            else
                                in_array($archivo, $idArchivosRelacionados, true) || $idArchivosRelacionados[] = (int)$archivo;
                        }

                        break;
                    case 'Tabla':
                        if (!isset($elemento['campos']['filas'])) {
                            break;
                        }

                        foreach ($elemento['campos']['filas'] as $columnas) {

                            foreach ($columnas as $columna) {

                                if (isset($columna['archivos'])) {

                                    foreach ($columna['archivos'] as $archivo) {
                                        if (isset($archivo['id']))
                                            in_array($archivo['id'], $idArchivosRelacionados, true) || $idArchivosRelacionados[] = (int)$archivo['id'];
                                        else
                                            in_array($archivo, $idArchivosRelacionados, true) || $idArchivosRelacionados[] = (int)$archivo;
                                    }

                                }

                            }

                        }

                        break;
                    case 'Formulario':
                        foreach ($elemento['campos'] as $pregunta) {
                            if (isset($pregunta['archivos'])) {
                                foreach ($pregunta['archivos'] as $archivo) {
                                    if (isset($archivo['id']))
                                        in_array($archivo['id'], $idArchivosRelacionados, true) || $idArchivosRelacionados[] = (int)$archivo['id'];
                                    else
                                        in_array($archivo, $idArchivosRelacionados, true) || $idArchivosRelacionados[] = (int)$archivo;
                                }
                            }
                        }
                        break;
                        //agregamos funcionamiento para wysiwyg
                    case 'Plantilla genérica':
                        foreach ($elemento['campos'] as $campo) {
                            if ($campo['type'] === 'bancoArchivos') {
                                $idArchivosRelacionados = [];
                                foreach ($campo['data']['archivos'] as $archivo) {
                                    if (isset($archivo['id']))
                                        in_array($archivo['id'], $idArchivosRelacionados) || $idArchivosRelacionados[] = (int)$archivo['id'];
                                    else
                                        in_array($archivo, $idArchivosRelacionados) || $idArchivosRelacionados[] = (int)$archivo;
                                }

                                $campo['data']['archivos'] = $idArchivosRelacionados;
                            }
                        }
                        break;

                    default:
                        break;
                }
            }}

        return $idArchivosRelacionados;
    }

    public static function isContentDirty($old, $new) {
        if (!isset($old) || !isset($new)) {
            return true;
        }

        if (count($old) !== count($new)) {
            return true;
        }

        foreach ($old as $key => $oldElement) {
            $newElement = $new[$key];

            if ($oldElement['id_elemento'] !== $newElement['id_elemento']) {
                return true;
            }

            switch ($oldElement['tipo_elemento']) {
                case "Campo de texto corto":
                case "Campo de texto largo":
                    if ($oldElement['campos']['value'] !== $newElement['campos']['value']) {
                        return true;
                    }
                    break;
                case "Archivo":
                    if (self::isFileDirty($newElement['campos'], $oldElement['campos'])) {
                        return true;
                    }
                    break;
                case "Enlace":
                    if (self::isLinkDirty($newElement['campos'], $oldElement['campos'])) {
                        return true;
                    }
                    break;
                case "Tabla":
                    if (self::isTableDirty($newElement['campos'], $oldElement['campos'])) {
                        return true;
                    }
                    break;
                case "Gráfica":
                    if (self::isGraphDirty($newElement['campos'], $oldElement['campos'])) {
                        return true;
                    }
                    break;
                case "Formulario":
                    if (self::isFormDirty($newElement['campos'], $oldElement['campos'])) {
                        return true;
                    }
                    break;
                case "Plantilla genérica":
                    if (self::isWysiwygDirty($newElement['campos'], $oldElement['campos'])) {
                        return true;
                    }
                    break;
                default:
                    break;
            }
        }

        return false;
    }

    public static function isWysiwygDirty ($new, $old) {
        if (count($new) !== count($old)) {
            return true;
        }

        $dotNew = Arr::dot($new);
        $dotOld = Arr::dot($old);

        ksort($dotNew);
        ksort($dotOld);

        if (json_encode($dotNew) !== json_encode($dotOld)) {
            return true;
        }

        return false;
    }

    public static function isFileDirty($newFile, $oldFile) {
        if (count($newFile) !== count($oldFile)) {
            return true;
        }

        foreach ($newFile as $key => $new) {
           if ($new !== $oldFile[$key]) {
               return true;
           }
        }
        return false;

    }

    public static function isLinkDirty($newLink, $oldLink) {
        if (count($newLink) !== count($oldLink)) {
            return true;
        }

        foreach ($newLink as $key => $new) {
           if ($new['etiqueta'] !== $oldLink[$key]['etiqueta'] ||
            $new['hipervinculo'] !== $oldLink[$key]['hipervinculo']) {
               return true;
           }
        }
        return false;
    }

    public static function isGraphDirty($newGraph, $oldGraph) {
        if ($newGraph['titulo'] !== $oldGraph['titulo']) {
            return true;
        }

        if (count($newGraph['etiquetas']) !== count($oldGraph['etiquetas'])) {
            return true;
        }

        foreach ($newGraph['etiquetas'] as $key => $newEtiqueta) {
            $oldEtiqueta = $oldGraph['etiquetas'][$key];

            if ($oldEtiqueta !== $newEtiqueta) {
                return true;
            }
        }

        if (count($newGraph['valores']) !== count($oldGraph['valores'])) {
            return true;
        }

        foreach ($newGraph['valores'] as $index => $newObject) {
            $oldObject = $oldGraph['valores'][$index];

            if (count($oldObject) !== count($newObject)) {
                return true;
            }

            foreach ($newObject as $key => $value) {
                if (!isset($oldObject[$key])) {
                    return true;
                }

                if ($oldObject[$key] !== $value) {
                    return true;
                }
            }
        }

        return false;
    }

    public static function isTableDirty($newTable, $oldTable) {
        // si ninguna tabla existe, no hay cambios
        if (!isset($oldTable) && !isset($newTable)) {
            return false;
        }

        if (!isset($oldTable) && isset($newTable)) {
            return true;
        }

        if (isset($oldTable) && !isset($newTable)) {
            return true;
        }

        // cuando los arrays están limpios
        if (count($oldTable) === 0 && count($newTable) > 0) {
            return true;
        }

        if (count($oldTable) > 0 && count($newTable) === 0) {
            return true;
        }

        if ($newTable['se_justifica'] !== $oldTable['se_justifica']) {
            return true;
        }

        if ($newTable['se_justifica']) {

            if ($newTable['justificacion'] !== $oldTable['justificacion']) {
                return true;
            }

            return false;
        }

        if ($newTable['encabezado'] !== $oldTable['encabezado']) {
            return true;
        }

        if ($newTable['titulos_columnas'] || $oldTable['titulos_columnas']) {
            if (count($newTable['titulos_columnas']) !== count($oldTable['titulos_columnas'])) {
                return true;
            }

            foreach ($newTable['titulos_columnas'] as $key => $newTitulo) {
                if ($newTitulo !== $oldTable['titulos_columnas'][$key]) {
                    return true;
                }
            }
        }

        if (count($newTable['filas']) !== count($oldTable['filas'])) {
            return true;
        }

        foreach ($newTable['filas'] as $key => $newRow) {
            $oldRow = $oldTable['filas'][$key];

            if (count($newRow) !== count($oldRow)) {
                return true;
            }

            foreach ($newRow as $keyCell => $newCell) {
                $oldCell = $oldRow[$keyCell];

                if ($newCell['descripcion'] !== $oldCell['descripcion'] ||
                    self::isFileDirty($newCell['archivos'], $oldCell['archivos']) ||
                    self::isLinkDirty($newCell['enlaces'], $oldCell['enlaces'])) {
                        return true;
                }
            }
        }

        return false;
    }

    public static function isFormDirty ($newForm, $oldForm) {
        if (count($newForm) !== count($oldForm)) {
            return true;
        }

        foreach ($newForm as $key => $newAnswer) {
            $oldAnswer = $oldForm[$key];
            if ($newAnswer['valor'] !== $oldAnswer['valor'] ||
                self::isFileDirty($newAnswer['archivos'], $oldAnswer['archivos']) ||
                self::isLinkDirty($newAnswer['enlaces'], $oldAnswer['enlaces'])) {
                return true;
            }
        }

        return false;
    }

    public static function formatContenido($plantilla, $contenido) {
        if (!isset($plantilla)) {
            return [];
        }

        $plantilla_elementos = collect($plantilla['elementos']);

        $campos_contenido = collect($contenido);
        $campos_finales = collect([]);

        // por cada elemento de la plantilla, buscamos el campo del contenido de la dependencia
        $plantilla_elementos->each(function ($elemento) use ($campos_contenido, $campos_finales) {
            $contenido_elemento = $campos_contenido->first(function ($value, $key) use ($elemento) {
                return $value['id_elemento'] === $elemento['id'];
            });

            if ($elemento['tipo_elemento'] === 'Tabla') {
                //revisamos si la tabla no está vacia
                $utilities = new Utilities();
                $esVacio = $utilities->emptyArray($elemento['campos']);

                if(!$esVacio) {
                    $contenido_elemento['columnas'] = collect($elemento['caracteristicas']['columnas'])
                        ->map(function ($item, $key) {
                            return $item['width'];
                        });

                    if (isset($elemento->campos['encabezado']) && !$utilities->emptyArray($elemento->campos['encabezado'])) {
                        //SI EL ENCABEZADO NO ESTA VACIO ES CARGADO POR GOB ESTADO
                        $contenido_elemento['campos']['encabezado'] = $elemento->campos['encabezado'];
                    }
            
            
                    if (isset($elemento->campos['titulos_columnas']) && !$utilities->emptyArray($elemento->campos['titulos_columnas'])) {
                        //SI EL ENCABEZADO NO ESTA VACIO ES CARGADO POR GOB ESTADO
                        $contenido_elemento['campos']['titulos_columnas'] = $elemento->campos['titulos_columnas'];
                    }
            
                    if (isset($elemento->campos['filas']) && !$utilities->emptyArray($elemento->campos['filas'])) {
                        $contenido_elemento['campos']['filas'] = $elemento->campos['filas'];
                    }    
                }
            }

            if ($elemento['tipo_elemento'] === 'Gráfica') {
                $contenido_elemento['caracteristicas'] = $elemento['caracteristicas'];
            }

            // Si es de tipo formulario, hay que agregar la pregunta para procesar en front
            if ($elemento['tipo_elemento'] === 'Formulario') {
                $utilities = new Utilities();
                $esVacio = $utilities->emptyArray($contenido_elemento['campos']);
                
                if (!$esVacio) {
                    $preguntas = $elemento['caracteristicas']['preguntas'];
                    $contenido_elemento['campos'] = collect($contenido_elemento['campos'])
                        ->map(function ($item, $key) use ($preguntas) {
                            $item['pregunta'] = $preguntas[$key]['pregunta'];
                            return $item;
                        });
                } else {
                   $contenido_elemento = null;
                }
            }

            if ($contenido_elemento) {
                $campos_finales->push($contenido_elemento);
            }
        });

        return $campos_finales->toArray();;
    }

    public function querySiguienteDiaHabil($dependencia_id, $fechaInicial, $offset) {
        /*
        \DB::enableQueryLog();

        $query = \DB::table('dias_habiles')
            ->select('dia_habil')
            ->leftJoin('dias_inhabiles', 'dias_inhabiles.dia_inhabil', 'dias_habiles.dia_habil')
            ->leftJoin('dependencias_dias_inhabiles', 'dependencias_dias_inhabiles.dia_inhabil_id', 'dias_inhabiles.id')
            ->where(function ($query) use ($dependencia_id) {
                $query->whereNull('dependencias_dias_inhabiles.id')->orWhere('dependencias_dias_inhabiles.dependencia_id', "!=", $dependencia_id);
            })
            ->where(function ($query) use ($dependencia_id) {
                $query->whereNull('dias_inhabiles.dia_inhabil')->orWhere('dependencias_dias_inhabiles.dependencia_id', "!=", $dependencia_id);
            })
            ->where('dias_habiles.dia_habil', '>=', $fechaInicial)
            ->orderBy('dias_habiles.dia_habil', 'ASC')
            ->distinct()
            ->offset($offset)
            ->take(1);
        $result = $query->get();
        \Log::info(\DB::getQuerylog());
        */

        $result = \DB::select(\DB::raw("SELECT distinct(dias_habiles.dia_habil)
            FROM dias_habiles
            LEFT JOIN
            (SELECT dias_inhabiles.dia_inhabil AS dia,dependencias_dias_inhabiles.dependencia_id AS id_dep
            FROM dias_inhabiles
            LEFT JOIN dependencias_dias_inhabiles ON (dependencias_dias_inhabiles.`dia_inhabil_id` = dias_inhabiles.id)
            WHERE dependencias_dias_inhabiles.dependencia_id = :query_dependencia_id OR dependencias_dias_inhabiles.dependencia_id IS NULL) AS di ON di.dia = dia_habil
            WHERE dias_habiles.dia_habil >= :query_fecha_inicial and dia is null
            ORDER BY dias_habiles.dia_habil ASC
            LIMIT 1
            OFFSET :query_offset
        "),["query_dependencia_id" => $dependencia_id, "query_fecha_inicial" => $fechaInicial, "query_offset" => $offset]);

        return $result;
    }

}
