<?php

namespace App\Http\Requests\StoreModel;

use App\Http\Requests\FormRequest;
use Carbon\Carbon;

class StoreLoanRequest extends FormRequest
{
    protected $rules =  [
        'user_id' => 'required|exists:users,id',
        'details' => 'string|nullable',
        'status' => 'string|nullable',

        'return_date' => 'date|after:tomorrow|required',
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
        $data['status'] =  "ok";

        if(!isset($data['return_date'])) {
            $data['return_date'] =  Carbon::now()->addWeeks(2);
        }

        if (isset($data['object_type'])) {
            if ($data['object_type'] == "material") {
                $data['object_type'] =  "App\Models\Material";
                $this->rules['object_id'] = 'exists:App\Models\Material,id';
            } else if ($data['object_type'] == "book") {
                $data['object_type'] = "App\Models\BookCopy";
                $this->rules['object_id'] = 'exists:App\Models\BookCopy,id';
            }
            $this->rules['object_type'] = 'required|in:App\Models\Material,App\Models\BookCopy';
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
