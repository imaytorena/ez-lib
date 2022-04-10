<?php

namespace App\Http\Requests\Book;

use App\Http\Requests\FormRequest;
use Carbon\Carbon;

class StoreRequest extends FormRequest
{
    protected array $rules = [
        'title' => 'string|max:50|required',
        'description' => 'string|max:255|nullable',

        'autor' => 'string|max:70|required',
        'publisher' => 'string|max:50|required',
        'isbn' => 'digits:10|required|unique:books',

        'genre' => 'string|required',

        'available' => 'boolean|required',
        'stock' => 'integer|max:9999|nullable',
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

        $data['isbn'] = isset($data['isbn']) ? (int) $data['isbn'] : null;
        $data['year'] = isset($data['year']) ? (int) $data['year'] : null;

        // Edits on rule validations
        if (isset($data['available']) && $data['available']) {
            $this->rules['stock'] = 'integer|required';
        }

        $date = Carbon::tomorrow()->year;
        $this->rules['year'] = 'integer|required|digits:4|max:'.($date);

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
