<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory
 */
class PermissionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'name' => "books",
            'label' => "Libros",
            'description' => "Acciones básicas para el módulo de libros",
            'actions' => json_encode(['REPORTS', 'CREATE', 'SHOW', 'UPDATE', 'DELETE']),
        ];
    }
}
