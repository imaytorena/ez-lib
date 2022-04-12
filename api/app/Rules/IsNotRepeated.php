<?php

namespace App\Rules;

use Illuminate\Contracts\Validation\Rule;

class IsNotRepeated implements Rule
{
    private array $elements;

    /**
     * Create a new rule instance.
     *
     * @return void
     */
    public function __construct(array $elements)
    {
        $this->elements = $elements;
    }

    /**
     * Determine if the validation rule passes.
     *
     * @param  string  $attribute
     * @param  mixed  $value
     * @return bool
     */
    public function passes($attribute, $value): bool
    {
        $elements = $this->elements;

        $index = array_search($value, $this->elements);
        if($index !== FALSE){
            unset($elements[$index]);
        }
        return !in_array($value, $elements);
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message(): string
    {
        return 'El elemento :attribute está repetido.';
    }
}
