<?php

namespace Database\Factories;

use App\Models\Loan;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class LoanFactory extends Factory
{
    protected $model = Loan::class;

    public function definition(): array
    {
        $objects = [
            \App\Models\BookCopy::class,
            \App\Models\Material::class,
        ];
        $objectType = $this->faker->randomElement($objects);
        $object = $objectType::factory()->create();

        // $status = $this->faker->randomElement(['right', 'extension', 'overtime', 'cancelled']);
        $status = "right";
        return [
            'user_id' => User::all()->random()->id,
            'object_type' => $objectType,
            'object_id' => $object->id,
            'status' => $status,
            'details' => $this->faker->paragraph(1),
    	];
    }
}
