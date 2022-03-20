<?php

namespace Database\Factories;

use App\Models\BookCopy;
use Illuminate\Database\Eloquent\Factories\Factory;

class BookCopyFactory extends Factory
{
    protected $model = BookCopy::class;

    public function definition(): array
    {
        $book = \App\Models\Book::factory()->create();

    	return [
            'book_id' => $book->id,
            'name' => $this->faker->sentence(3),
            'features' => $this->faker->paragraph(1),
            'folio' => $this->faker->ean8()
    	];
    }
}
