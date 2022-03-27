<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Book;
use App\Models\Material;
use App\Models\Role;
use App\Models\Permission;
// use App\Models\Fee;

class DevelopmentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        User::factory()->count(10)->create();
        Book::factory()->count(10)->create();
        Material::factory()->count(10)->create();
        Role::factory()->count(1)->create();
    }
}
