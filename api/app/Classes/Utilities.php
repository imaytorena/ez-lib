<?php

namespace App\Classes;
use Carbon\Carbon;

class Utilities
{
    public static function getFileExtension($file_name): string
    {
        $n = strrpos($file_name, ".");
        if ($n === false) return "";
        return substr($file_name, $n + 1);
    }

    public static function integerToRoman($integer): string
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

    public function emptyArray($array, $ignoreKeys = ['id', 'se_justifica']): bool
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

    public function getMessageErrors(): array
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

    public function cleanKeys($arrayClean, $arrayCheck): array
    {
        return array_intersect_key($arrayClean, $arrayCheck);
    }

    public function cleanEmptysAndNULLKeys($arrayClean): array
    {
        $arrayClean = $this->trimArray($arrayClean);
        $arrayClean = array_filter($arrayClean, function ($value) {
            if ($value === false || $value === 0 || $value === "0")
                return true;
            return !is_null($value) && $value !== '' && !empty($value);
        });
        return $arrayClean;
    }

    public function trimArray($arrayClean): array
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

    public function changeStringsNullsToNull($array): array
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

    public function getDayDiff($start_day, $end_day): int
    {
        $start = Carbon::parse($start_day)->startOfDay();
        $end = Carbon::parse($end_day)->startOfDay();
        return $end->diffInDays($start);
    }

    public function generateRandomPassword(): string
    {
        $caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#%^&*()_,./<>?;:[]{}\|=+';
        $randomPassword = '';
        $limit = strlen($caracteres) - 1;
        for ($i = 0; $i < 8; $i++) {
            $randomPassword .= $caracteres[rand(0, $limit)];
        }
        return $randomPassword;
    }

    public function generateRandomUser(): string
    {
        $caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        $randomUserName = '';
        $limit = strlen($caracteres) - 1;
        for ($i = 0; $i < random_int(8, 25); $i++) {
            $randomUserName .= $caracteres[rand(0, $limit)];
        }
        return $randomUserName;
    }

    public function generateRandomString($length = 1): string
    {
        $caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        $randomString = '';
        $limit = strlen($caracteres) - 1;
        for ($i = 0; $i < $length; $i++) {
            $randomString .= $caracteres[random_int(0, $limit)];
        }
        return $randomString;
    }

    function humanFileSize($size, $unit = ""): string
    {
        if ((!$unit && $size >= 1 << 30) || $unit === "GB")
            return number_format($size / (1 << 30), 2) . "GB";
        if ((!$unit && $size >= 1 << 20) || $unit === "MB")
            return number_format($size / (1 << 20), 2) . "MB";
        if ((!$unit && $size >= 1 << 10) || $unit === "KB")
            return number_format($size / (1 << 10), 2) . "KB";
        return number_format($size) . " bytes";
    }


    public static function isFileDirty($newFile, $oldFile): bool
    {
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

    public static function isLinkDirty($newLink, $oldLink): bool
    {
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
}
