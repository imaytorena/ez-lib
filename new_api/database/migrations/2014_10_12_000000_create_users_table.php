<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
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
            $table->string('username', 50)->unique()->comment('Usuario');
            $table->string('code', 12)->unique()->nullable()->comment('Código escolar');
            $table->string('email', 50)->unique()->nullable()->comment('Correo');
            $table->string('password', 50)->nullable()->comment('Contraseña');
            
            $table->string('name', 50)->nullable()->comment('Nombre');
            $table->string('last_name', 50)->nullable()->comment('Apellido');
            
            $table->boolean('status')->default(1)->comment('Estado');
            $table->enum('genre', ['male', 'female', 'other'])->nullable()->comment('Genero');
            $table->string('phone', 14)->nullable()->comment('Teléfono');

            $table->rememberToken();
            $table->timestamp('email_verified_at')->nullable();
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
};
