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
        Schema::create('books', function (Blueprint $table) {
            $table->id();
            $table->string('title', 50)->comment('Titulo');
            $table->string('description', 255)->comment('Descripción');
            $table->string('autor', 70)->comment('Autor');
            $table->string('publisher', 50)->comment('Editorial');
            $table->string('isbn', 10)->comment('ISBN')->unique();
            $table->integer('year')->comment('Año de publicación');
            $table->string('genre', 40)->comment('Genero');
            $table->boolean('available')->default(false)->comment('Disponibilidad');
            $table->integer('stock')->comment('Existencia');
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
        Schema::dropIfExists('books');
    }
};
