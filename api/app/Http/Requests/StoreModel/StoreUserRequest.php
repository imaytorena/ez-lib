<?php

namespace App\Http\Requests\StoreModel;

use App\Http\Requests\FormRequest;

use App\Models\User;

class StoreUserRequest extends FormRequest
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
        $id = $this->route("id") ?? null;

        $data = $this->validationData();

        if ($id) {
            $temp_rules = $this->rules;

            // Validates unique values are not on another user
            $user_already_exist = User::query()->where('id', '!=', $id)
                ->where(function ($query) use ($data) {
                    if (isset($data['username']))
                        $query->where('username', '=', $data['username']);
                    if (isset($data['code']))
                        $query->orWhere('code', '=', $data['code']);
                    if (isset($data['email']))
                        $query->orWhere('email', '=', $data['email']);
                })
                ->first();

            $key_validated = array('username', 'code', 'email');
            foreach ($key_validated as $key) {
                // Remove restrictions from current key
                $temp_rules[$key] = str_replace('|unique:users', '', $temp_rules[$key]);
                $temp_rules[$key] = str_replace('required', 'nullable', $temp_rules[$key]);
                // Only if exists and current key is in the request
                if ($user_already_exist && isset($data[$key])) {
                    if ($data[$key] == $user_already_exist[$key]) {
                        $temp_rules[$key] = $this->rules[$key];
                    }
                }
            }
            $this->rules = $temp_rules;

            $this->rules['password'] = 'nullable';
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
