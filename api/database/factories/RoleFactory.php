<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

use App\Models\Role;
use App\Models\Permission;

/**
 * @extends Factory
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
            'label' => "Administrador",
            'description' => $this->faker->paragraph(2),
        ];
    }

    public function configure(): RoleFactory
    {
        return $this->afterCreating(function (Role $role) {
            $permission = Permission::factory()->create();
//            $a = $permission->ids;
            // $role->permissions()->attach($permission[0]["id"], ['active_actions' => decbin(15)]);
             $role->givePermissionTo("books", bindec("1111111"));

            return $permission;
        });
    }
}
