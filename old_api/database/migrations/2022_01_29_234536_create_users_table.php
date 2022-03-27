<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('username', 50)->comment('Usuario');
            $table->string('code', 12)->nullable()->comment('Código escolar');
            $table->string('password', 50)->comment('Contraseña');
            $table->string('email', 50)->nullable()->comment('Correo');
            $table->string('name', 50)->nullable()->comment('Nombre');
            $table->string('last_name', 50)->nullable()->comment('Apellido');
            $table->boolean('status')->comment('Estado');
            $table->enum('genre', ['male', 'female', 'other'])->comment('Genero');
            $table->string('phone', 14)->nullable()->comment('Teléfono');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
    }
}
