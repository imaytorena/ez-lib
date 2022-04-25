<?php

namespace Database\Factories;

use App\Models\Devolution;
use App\Models\Loan;
use App\Models\User;
use App\Services\LoanService;
use Carbon\Carbon;
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

        $status = $this->faker->randomElement(['ok', 'extension', 'overtime', 'cancelled']);
        // $status = "ok";
        return [
            'user_id' => User::all()->random()->id,
            'object_type' => $objectType,
            'object_id' => $object->id,
            'status' => $status,
            'details' => $this->faker->paragraph(1),
    	];
    }

    public function configure()
    {
        return $this->afterCreating(function (Loan $loan) {
            $data = [
                'user_id' => $loan['user_id'],
                'object_type' => $loan['object_type'],
                'object_id' => $loan['object_id'],
                'return_date' => $loan['status'] == 'ok' ? Carbon::now()->subWeeks(2) : Carbon::now()->subWeek()
            ];
            if ($loan['user_id'] % 2 == 0 ) {
                LoanService::create($data);
            }
        });
    }
}
