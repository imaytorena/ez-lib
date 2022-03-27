<?php
namespace App\Http\Requests\StoreModel;

use App\Http\Requests\FormRequest;
use App\Classes\Utilities;

use App\Models\Book;

class StoreBookRequest extends FormRequest
{
    protected $rules =  [
        'title' => 'string|required',
        'description' => 'string|nullable',
        
        'autor' => 'string|required',
        'publisher' => 'string|required',
        'isbn' => 'digits:10|required|unique:books',

        'genre' => 'string|required',
        
        'available' => 'boolean|required',
        'stock' => 'integer|nullable',
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
        $id = null;
        $data = $this->validationData();
        
        // \Log::info($this->route());
        // \Log::info($id);
        // \Log::info($data);
        // \Log::info($this->route());
        
        $data['isbn'] = isset($data['isbn']) ? (int) $data['isbn'] : null;
        $data['year'] = isset($data['year']) ? (int) $data['year'] : null;
        
        if ($id) {
            // Validations when is update method
        }

        $date = \Carbon\Carbon::tomorrow()->year;
        $this->rules['year'] = 'integer|required|digits:4|max:'.($date);
        
        $this->cleanData();
        $data = $this->utilities->cleanEmptysAndNULLKeys($data);
        $data = $this->utilities->cleanKeys($data, $this->rules);
        
        $this->merge($data);
        \Log::info($this);
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
