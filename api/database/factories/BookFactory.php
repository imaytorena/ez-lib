<?php

namespace Database\Factories;

use App\Models\Book;
use Illuminate\Database\Eloquent\Factories\Factory;

class BookFactory extends Factory
{
    protected $model = Book::class;

    public function definition(): array
    {
    	return [
            'title' => $this->faker->sentence(2),
            'description' => $this->faker->paragraph(2),
            'autor' => $this->faker->firstName(),
            'publisher' => $this->faker->company(),
            'isbn' => $this->faker->isbn10(),
            'year' => $this->faker->year(),
            'genre' => $this->faker->word(),
            'available' => $this->faker->boolean(),
            'stock' => $this->faker->randomNumber(2, false),
    	];
    }
}