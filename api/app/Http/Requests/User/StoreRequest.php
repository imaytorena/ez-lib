<?php

namespace App\Http\Requests\User;

use App\Http\Requests\FormRequest;

class StoreRequest extends FormRequest
{
    protected array $rules = [
        'username' => 'required|string|unique:users',
        'password' => 'required',

        'code' => 'string|digits_between:8,12|nullable|unique:users',
        'email' => 'email|nullable|unique:users',
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
