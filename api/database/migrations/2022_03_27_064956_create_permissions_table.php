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
        Schema::create('permissions', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('permission_category_id')->nullable();

            $table->string('name')->comment('Nombre')->unique();
            $table->string('label')->comment('Etiqueta para mostrar en frontend')->unique();
            $table->text('description')->comment('Descripción del módulo');
            $table->json('actions')->comment('JSON array con el nombre de cada permiso');

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
        Schema::dropIfExists('permissions');
    }
};
