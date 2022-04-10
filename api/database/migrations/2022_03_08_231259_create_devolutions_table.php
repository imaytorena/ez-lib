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
        Schema::create('devolutions', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('loan_id');
            $table->date('return_date')->comment('Fecha de termino del plazo');
            $table->enum('status_snapshot', ['ok', 'extension', 'overtime', 'cancelled'])->default('ok')->comment('Copia del estado en el que se hizo');
            $table->boolean('active')->comment('Está activa esta devolución o no');
            $table->timestamps();

            $table->foreign('loan_id')->references('id')->on('loans');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('devolutions');
    }
};
