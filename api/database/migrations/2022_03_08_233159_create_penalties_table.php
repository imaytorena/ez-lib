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
        Schema::create('penalties', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('loan_id');
            $table->uuid('ticket_folio')->comment('Folio del ticket levantado');
            $table->enum('reason', ['out_date', 'never_will_return', 'book4book', 'return_damaged', 'other'])->comment('Motivo');
            $table->string('details')->comment('Detalles')->nullable();
            $table->integer('total')->comment('Detalles')->nullable();
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
        Schema::dropIfExists('penalties');
    }
};
