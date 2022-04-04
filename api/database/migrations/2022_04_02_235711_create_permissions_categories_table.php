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
        Schema::create('permissions_categories', function (Blueprint $table) {
            $table->id();
            $table->unsignedInteger('index')->comment('Indice para el orden a mostrar las categorias');
            $table->string('name')->comment('Nombre que tendrá la categoria para visualizarla en frontend');
            $table->string('label')->nullable()->comment('Nombre a mostrar en front end para esta categoria');
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
        Schema::dropIfExists('permissions_categories');
    }
};
