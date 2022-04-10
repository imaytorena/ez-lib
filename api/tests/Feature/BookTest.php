<?php

namespace Tests\Feature;

use App\Models\Book;
use Faker\Factory;
use Tests\TestCase;

class BookTest extends TestCase
{
    private string $base_url = "/api/books";

    /**
     * User list method must return a paginated list
     *
     * @return void
     */
    public function test_list()
    {
        $response = $this->getJSON($this->base_url);
        $response
            ->assertStatus(200)
            ->assertJsonStructure([
                    'data' => [
                        [
                            'id',
                            'title',
                            'description',
                            'autor',
                            'publisher',
                            'isbn',
                            'year',
                            'genre',
                            'available',
                            'stock',
                            'created_at',
                            'updated_at',
                        ]
                    ],
                ]
            );
    }

    /**
     * User list method must return a paginated list
     *
     * @return void
     */
    public function test_all()
    {
        $response = $this->getJSON("$this->base_url/all");
        $response
            ->assertStatus(200)
            ->assertJsonStructure([
                    [
                        'id',
                        'title',
                        'description',
                        'autor',
                        'publisher',
                        'isbn',
                        'year',
                        'genre',
                        'available',
                        'stock',
                        'created_at',
                        'updated_at',
                    ]
                ]
            );
    }

    /**
     * User create method must save a new user
     *
     * @return void
     */
    public function test_create()
    {
        $faker = Factory::create();
        $req = [
            'title' => 'Test',
            'description' => $faker->sentence(4),
            'autor' => 'Test',
            'publisher' => $faker->company(),
            'isbn' => $faker->numerify('##########'),
            'year' => $faker->year(),
            'genre' => $faker->word(),
            'available' => $faker->boolean(),
            'stock' => $faker->randomNumber(2),
        ];
        $response = $this->postJson($this->base_url, $req);
        $response
            ->assertStatus(201)
            ->assertJsonStructure([
                'book' => [
                    'title',
                    'description',
                    'autor',
                    'publisher',
                    'isbn',
                    'year',
                    'genre',
                    'available',
                    'stock',
                    'updated_at',
                    'created_at',
                    'id',
                ],
                'message',
            ]);
    }

    /**
     * User update method must update a saved user
     *
     * @return void
     */
    public function test_update()
    {
        $user = Book::query()->where('title', '=', 'Test')->first();
        $faker = Factory::create();
        $req = [
            'title' => 'Test',
            'description' => $faker->sentence(4),
            'autor' => 'Updated',
            'publisher' => $faker->company(),
            'isbn' => $faker->numerify('##########'),
            'year' => $faker->year(),
            'genre' => $faker->word(),
            'available' => $faker->boolean(),
            'stock' => $faker->randomNumber(2),
        ];
        $response = $this->putJson("$this->base_url/$user->id", $req);

        $response
            ->assertStatus(200)
            ->assertJsonStructure([
                'book' => [
                    'title',
                    'description',
                    'autor',
                    'publisher',
                    'isbn',
                    'year',
                    'genre',
                    'available',
                    'stock',
                    'updated_at',
                    'created_at',
                    'id',
                ],
                'message',
            ]);
    }

    /**
     * User update method must update a saved user
     *
     * @return void
     */
    public function test_get_by_id()
    {
        $user = Book::query()->where('title', '=', 'Test')->first();
        $response = $this->getJson("$this->base_url/$user->id");
        $response
            ->assertStatus(200)
            ->assertJsonStructure([
                'book' => [
                    'title',
                    'description',
                    'autor',
                    'publisher',
                    'isbn',
                    'year',
                    'genre',
                    'available',
                    'stock',
                    'updated_at',
                    'created_at',
                    'id',
                ]
            ]);
    }

    /**
     * User update method must delete a saved user
     *
     * @return void
     */
    public function test_delete()
    {
        $user = Book::query()->where('title', '=', 'Test')->first();
        $response = $this->deleteJson("$this->base_url/$user->id");
        $response
            ->assertStatus(200)
            ->assertJsonStructure([
                'book' => [
                    'title',
                    'description',
                    'autor',
                    'publisher',
                    'isbn',
                    'year',
                    'genre',
                    'available',
                    'stock',
                    'updated_at',
                    'created_at',
                    'id',
                ],
                'message',
            ]);
    }
}
