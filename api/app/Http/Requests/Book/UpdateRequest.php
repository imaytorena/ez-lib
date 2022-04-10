<?php

namespace App\Http\Requests\Book;

use App\Http\Requests\FormRequest;
use App\Models\Book;
use Carbon\Carbon;

class UpdateRequest extends FormRequest
{
    protected array $rules = [
        'id' => 'required|integer|exists:books',

        'title' => 'string|max:50|nullable',
        'description' => 'string|max:255|nullable',

        'autor' => 'string|max:70|nullable',
        'publisher' => 'string|max:50|nullable',
        'isbn' => 'digits:10|nullable',

        'genre' => 'string|nullable',

        'available' => 'boolean|nullable',
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
        $data['id'] = $this->route("id") ?? null;

        if(isset($data['isbn'])) {
            $data['isbn'] = (int) $data['isbn'];

            $exits = Book::query()
                ->where('isbn', '=', $data['isbn'])
                ->where('id', '!=', $data['id'])
                ->first();
            if($exits) {
                $this->rules['isbn'] = 'digits:10|unique:books';
            }
        }
        $data['year'] = isset($data['year']) ? (int) $data['year'] : null;

        // Edits on rule validations
        if (isset($data['available']) && $data['available']) {
            $this->rules['stock'] = 'integer|required';
        }

        $date = Carbon::tomorrow()->year;
        $this->rules['year'] = 'integer|nullable|digits:4|max:'.($date);

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
