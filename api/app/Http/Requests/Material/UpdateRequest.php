<?php

namespace App\Http\Requests\Material;

use App\Http\Requests\FormRequest;

class UpdateRequest extends FormRequest
{
    protected array $rules = [
        'id' => 'required|integer|exists:materials',

        'serial_number' => 'string|nullable|unique:materials',
        'option' => 'string|nullable|in:computer,projector,peripherals,other',

        'details' => 'string|nullable',
        'brand' => 'string|nullable',
        'model' => 'string|nullable',

        'status' => 'string|nullable|in:ok,has_some_details,new',
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

        $data['id'] = $this->route("id") ?? null;

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
