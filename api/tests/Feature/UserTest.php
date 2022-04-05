<?php

namespace Tests\Feature;

use App\Models\User;
use Faker\Factory;
use Tests\TestCase;

class UserTest extends TestCase
{
    private string $base_url = "/api/users";

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
     * User create method must save a new user
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

    /**
     * User update method must update a saved user
     *
     * @return void
     */
    public function test_update()
    {
        $user = User::query()->where('name', '=', 'Test')->first();
        $faker = Factory::create();
        $response = $this->putJson("$this->base_url/$user->id", [
            'username'=> $faker->unique()->userName(),
            'code'=> $faker->unique()->ean8(),
            'email'=> $faker->unique()->email(),
            'name'=> 'Test',
            'last_name'=> 'Updated',
            'status' => $faker->boolean(true),
            'genre' => $faker->randomElement(['male', 'female', 'other']),
            'phone' => $faker->e164PhoneNumber(),
        ]);
        $response
            ->assertStatus(200)
            ->assertJsonStructure([
                'user' => [
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
        $user = User::query()->where('name', '=', 'Test')->first();
        $response = $this->getJson("$this->base_url/$user->id");
        $response
            ->assertStatus(200)
            ->assertJsonStructure([
                'user' => [
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
            ]);
    }

    /**
     * User update method must delete a saved user
     *
     * @return void
     */
    public function test_delete()
    {
        $user = User::query()->where('name', '=', 'Test')->first();
        $response = $this->deleteJson("$this->base_url/$user->id");
        $response
            ->assertStatus(200)
            ->assertJsonStructure([
                'user' => [
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
                ],
                'message',
            ]);
    }
}
