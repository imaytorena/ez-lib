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
    	return [
            'user_id' => User::all()->random()->id,
            'status' => $this->faker->randomElement(['right', 'extension', 'overtime', 'cancelled']),
            'details' => $this->faker->paragraph(2),
    	];
    }
}
