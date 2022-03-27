<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

use App\Models\Role;
use App\Models\Permission;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Role>
 */
class RoleFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'name' => "admin",
            'description' => $this->faker->paragraph(2),
        ];
    }

    public function configure()
    {
        return $this->afterCreating(function (Role $role) {
            // creates two book copies
            $permission = Permission::factory()->count(1)->create();
            // $role->permissions()->attach($permission[0]["id"], ['active_actions' => decbin(15)]);
            $role->givePermissionTo("crud", "1111");
        });
    }
}
