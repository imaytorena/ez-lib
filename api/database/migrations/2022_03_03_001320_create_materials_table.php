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
        Schema::create('materials', function (Blueprint $table) {
            $table->id();
            $table->string('serial_number')->comment('Número de serie');
            $table->enum('option', ['computer', 'projector', 'peripherals', 'other'])->comment('Opcion o Tipo');
            $table->string('details')->nullable()->comment('Detalles opcional');
            $table->string('brand')->nullable()->comment('Marca');
            $table->string('model')->nullable()->comment('Modelo');
            $table->enum('status', ['ok', 'has_details', 'new'])->default('ok')->nullable()->comment('Estado');
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
        Schema::dropIfExists('materials');
    }
};
