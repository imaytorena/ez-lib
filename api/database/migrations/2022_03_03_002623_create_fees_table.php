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
        Schema::create('fees', function (Blueprint $table) {
            $table->id();
            $table->morphs('folio');
            $table->integer('amount')->comment('Monto en MXN');
            $table->enum('transaction_type', ['cash', 'user_charge', 'debit_credit'])->default('cash')->comment('Tipo de transacción');
            $table->timestamps();

            $table->index(['folio_id', 'folio_type']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('fees');
    }
};
