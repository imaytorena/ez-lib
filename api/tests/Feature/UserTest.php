<?php

namespace Tests\Feature;

use Faker\Factory;
use Tests\TestCase;

class UserTest extends TestCase
{
    private string $base_url = "/api/users";

    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function test_list()
    {
        $response = $this->getJSON($this->base_url);
        $response
            ->assertStatus(200)
            ->assertJsonStructure([
                    'users' => [
                        'data' => [
                            [
                                'id',
                                'username',
                                'code',
                                'email',
                                'tipo',
                                'name',
                                'last_name',
                                'status',
                                'genre',
                                'phone',
                                'email_verified_at',
                                'created_at',
                                'updated_at',
                            ]
                        ],
                    ],
                ]
            );
    }

    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function test_create()
    {
        $faker = Factory::create();
        $response = $this->postJson($this->base_url, [
            'username'=> $faker->unique()->userName(),
            'password'=> bcrypt('passwordTest1234'),
            'code'=> $faker->unique()->ean8(),
            'email'=> $faker->unique()->email(),
            'name'=> 'Test',
            'last_name'=> 'Test',
            'status' => $faker->boolean(true),
            'genre' => $faker->randomElement(['male', 'female', 'other']),
            'phone' => $faker->e164PhoneNumber(),
        ]);
        $response
            ->assertStatus(201)
            ->assertJsonStructure([
                'user' => [
                    'id',
                    'username',
                    'created_at',
                    'updated_at',
                ],
                'message',
            ]);
    }
}
