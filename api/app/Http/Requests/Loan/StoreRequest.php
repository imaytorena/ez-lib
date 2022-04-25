<?php

namespace App\Http\Requests\Loan;

use App\Http\Requests\FormRequest;
use App\Models\Book;
use App\Models\BookCopy;
use App\Models\Loan;
use App\Rules\IsNotRepeated;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;

class StoreRequest extends FormRequest
{
    protected array $rules =  [
        'user_id' => 'required|exists:users,id',
        'object_id' => ['required'],
        'object_type' => ['required', 'string'],

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

        if (isset($data['object_type']) && isset($data['object_id'])) {
            // Change object_type to App\Models structure
            // Add object_id rules based on model
            if ($data['object_type'] == "material") {
                $data['object_type'] =  "App\Models\Material";
                $this->rules['object_id'][] = Rule::exists('App\Models\Material','id');
            } else if ($data['object_type'] == "book") {
                $data['object_type'] = "App\Models\BookCopy";
                $this->rules['object_id'][] = ['required', 'exists:App\Models\BookCopy,id'];
            }

            $this->rules['object_id'][] = Rule::unique("loans", "object_id")->where(function ($query) use ($data) {
                return $query->where('company_id', '!=', 'ok');
            });
            $this->rules['object_type'][] = 'in:App\Models\Material,App\Models\BookCopy';
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
