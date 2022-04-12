<?php

namespace App\Http\Requests\Book;

use App\Http\Requests\FormRequest;
use Carbon\Carbon;
use App\Rules\IsNotRepeated;

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

        'copies' => 'array|nullable',
        'copies.*.folio' => [ 'required_with:copies', 'integer', 'unique:book_copies' ],
        'copies.*.name' => 'required_with:copies|string',
        'copies.*.features' => 'required_with:copies|string',
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

        if (isset($data['copies']) && count($data['copies'])) {
            $copies = $data['copies'];
            $copies_folio = [];
            foreach ($copies as $copy) {
                $copies_folio[] = $copy['folio'];
            }
            $this->rules['copies.*.folio'][] = new IsNotRepeated($copies_folio);
        } else {
            $data['copies'] = [];
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
