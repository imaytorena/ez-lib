<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class UserFactory extends Factory
{
    /**
     * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
     * 
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = User::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'username' => $this->faker->unique()->userName(),
            'code' => $this->faker->unique()->ean8(),
            'password' => $this->faker->password(),
            'email' => $this->faker->unique()->safeEmail(),
            'email_verified_at' => now(),
            'name' => $this->faker->firstName(),
            'last_name' => $this->faker->lastName(),
            'status' => $this->faker->boolean(true),
            'genre' => $this->faker->randomElement(['male', 'female', 'other']),
            'phone' => $this->faker->e164PhoneNumber(),
        ];
    }

    /**
     * Indicate that the model's email address should be unverified.
     *
     * @return static
     */
    public function unverified()
    {
        return $this->state(function (array $attributes) {
            return [
                'email_verified_at' => null,
            ];
        });
    }
}
