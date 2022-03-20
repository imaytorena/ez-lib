<?php
namespace App\Http\Requests\StoreModel;

use App\Http\Requests\FormRequest;
use App\Classes\Utilities;

use App\Models\Book;

class StoreBookRequest extends FormRequest
{
    protected $rules =  [

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
        $id = $this->route()[2]['id'] ?? null;
        $data = $this->validationData();
        
        \Log::info($this->route());
        \Log::info($id);
        \Log::info($data);
        // if (isset($data['password'])) {
        //     $hashedPassword = app('hash')->make($data['password']);
        //     $data['password'] = $hashedPassword;
        // }

        if ($id) {
            // Validations when is update method
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
