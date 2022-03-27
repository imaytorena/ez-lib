<?php

namespace App\Traits;

use App\Models\Permission;
use App\Models\Role;

trait PermissionsHandler
{
    // $role->givePermissionTo("books", "1111");
    public function givePermissionTo(string $permissionName, string $actions)
    {
        $permission = Permission::where('name', $permissionName)->first();

        $this->permissions()->syncWithoutDetaching([$permission["id"] => ['active_actions' => $actions]]);

        return $this;
    }

    // $user->assignRole("crud")
    public function assignRole(string $roleName, string $extinct = null) {
        $role = Role::where('name', $roleName)->first();

        $this->roles()->syncWithoutDetaching([$role["id"] => ['extinct' => $extinct]]);

        return $this;
    }
}