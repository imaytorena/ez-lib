<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

use App\Models\Book;
use App\Models\BookCopy;

class BookFactory extends Factory
{
    protected $model = Book::class;

    public function definition(): array
    {
    	return [
            'title' => $this->faker->sentence(2),
            'description' => $this->faker->paragraph(1),
            'autor' => $this->faker->firstName(),
            'publisher' => $this->faker->company(),
            'isbn' => $this->faker->isbn10(),
            'year' => $this->faker->year(),
            'genre' => $this->faker->word(),
            'image_url' => $this->faker->imageUrl(),
            'available' => $this->faker->boolean(),
            'stock' => $this->faker->randomNumber(2, false),
    	];
    }

    public function configure()
    {
        return $this->afterCreating(function (Book $book) {
            // creates two book copies
            BookCopy::create([
                'book_id' => $book->id,
                'name' => $this->faker->sentence(3),
                'features' => $this->faker->paragraph(1),
                'folio' => $this->faker->ean8()
            ]);
            BookCopy::create([
                'book_id' => $book->id,
                'name' => $this->faker->sentence(3),
                'features' => $this->faker->paragraph(1),
                'folio' => $this->faker->ean8()
            ]);
        });
    }

}
