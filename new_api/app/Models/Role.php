<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\PermissionsHandler;

class Role extends Model
{
    use PermissionsHandler, HasFactory;

    protected $fillable = [
        'name',
        'description',
    ];

    protected $dates = [
        'created_at',
        'updated_at',
    ];
    
    public function users()
    {
        return $this->belongsToMany(User::class, 'users_roles', 'role_id', 'user_id')->withPivot('extinct');
    }

    public function permissions()
    {
        return $this->belongsToMany(Permission::class, 'roles_permissions', 'role_id', 'permission_id')->withPivot('active_actions');
    }
}
