<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class UserFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = User::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'username' => $this->faker->unique()->userName(),
            'code' => $this->faker->unique()->ean8(),
            'password' => $this->faker->password(),
            'email' => $this->faker->unique()->safeEmail(),
            'name' => $this->faker->firstName(),
            'last_name' => $this->faker->lastName(),
            'status' => $this->faker->boolean(true),
            'genre' => $this->faker->randomElement(['male', 'female', 'other']),
            'phone' => $this->faker->e164PhoneNumber(),
        ];
    }
}
