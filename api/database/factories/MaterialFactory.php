<?php

namespace Database\Factories;

use App\Models\Material;
use Illuminate\Database\Eloquent\Factories\Factory;

class MaterialFactory extends Factory
{
    protected $model = Material::class;

    public function definition(): array
    {
    	return [
            'serial_number' => $this->faker->uuid(),
            'option' => $this->faker->randomElement(['computer', 'projector', 'peripherals', 'other']),
            'details' => $this->faker->sentence(3),
            'brand' => $this->faker->company(),
            'model' => $this->faker->countryISOAlpha3(),
            'status' => $this->faker->randomElement(['ok', 'has_some_details', 'new']),
    	];
    }
}
