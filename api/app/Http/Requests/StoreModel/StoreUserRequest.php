<?php

namespace App\Http\Requests\StoreModel;

use App\Http\Requests\FormRequest;

use App\Models\User;

class StoreUserRequest extends FormRequest
{
    protected array $rules =  [
        'username' => 'required|string|unique:users',
        'password' => 'required',

        'code' => 'string|nullable|unique:users',
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
        $id = null;

        $data = $this->validationData();

        if ($id) {
            $validate = $this->rules;
            $user_already_exist = User::query()->where('id', '!=', $id)
                ->where(function ($query) use ($data) {
                    $query->where('username', '=', $data['username']);
                    $query->orWhere('code', '=', $data['code']);
                    $query->orWhere('email', '=', $data['email']);
                })
                ->first();

            if ($user_already_exist) {
                $key_validated = array('username', 'code', 'email');
                foreach ($key_validated as $key) {
                    $validate[$key] = !($data[$key] == $user_already_exist[$key]) ? 'string|nullable' : $validate[$key];
                }

                $this->rules = $validate;
            } else {
                $this->rules["username"] = 'string';
                $this->rules["code"] = 'string|nullable';
                $this->rules["email"] = 'string|email|nullable';
            }

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
