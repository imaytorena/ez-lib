<?php

namespace App\Http\Requests\Requests;

use App\Http\Requests\FormRequest;
use App\Classes\Utilities;

class StoreUserRequest extends FormRequest
{
    protected $rules =  [
        'username' => 'required|string|unique:users',
        'password' => 'required',
        
        'code' => 'string|nullable|unique:users',
        'email' => 'email|nullable',
        'genre' => 'nullable|in:male,female,other',

        'name' => 'string|nullable',
        'last_name' => 'string|nullable',
        
        'phone' => 'string|nullable|min:10|max:14',
    ];

    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Prepare the data for validation.
     *
     * @return void
     */
    protected function prepareForValidation()
    {
        $data = $this->validationData();

        if (isset($data['password'])) {
            $hashedPassword = app('hash')->make($data['password']);
            $data['password'] = $hashedPassword;
        }

        $this->cleanData();
        $data = $this->utilities->cleanEmptysAndNULLKeys($data);
        $data = $this->utilities->cleanKeys($data, $this->rules);

        $this->merge($data);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules(): array
    {
        return $this->rules;
    }
}
