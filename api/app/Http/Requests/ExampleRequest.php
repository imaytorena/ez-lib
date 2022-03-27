<?php

//Nota asegurarse de que el namespace apunte a la carpeta correcta  (modulo).
namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ExampleRequest extends FormRequest
{

    //Reglas basicas de cuenta
    protected $rules = [
    ];


    protected function prepareForValidation()
    {
        $data = $this->validationData();
        $this->cleanData();
        $data = $this->utilities->cleanEmptysAndNULLKeys($data);
        $data = $this->utilities->cleanKeys($data, $this->rules);
        $this->merge($data);
    }

    public function authorize()
    {
       return true;

    }

    public function rules()
    {
        return $this->rules;
    }

    public function messages()
    {
        return $this->utilities->getMessageErrors();
    }

}
