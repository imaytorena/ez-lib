<?php

//Nota asegurarse de que el namespace apunte a la carpeta correcta  (modulo).
namespace App\Http\Requests;

use App\Http\Requests\FormRequest;
use Illuminate\Validation\Rule;

class ExampleListarRequest extends FormRequest
{

    const rules = [
        "pageIndex" => "numeric",
        "pageSize" => "numeric",
        "search" => "string",
        "sortBy" => "array"
    ];


    protected function prepareForValidation()
    {
        $data = $this->validationData();
        $this->cleanData();
        $data = $this->utilities->cleanEmptysAndNULLKeys($data);
        $data = $this->utilities->cleanKeys($data, self::rules);
        $this->merge($data);
    }

    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return self::rules;
    }

    public function messages()
    {
        return $this->utilities->getMessageErrors();
    }

}
