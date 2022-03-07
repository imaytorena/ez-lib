<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDevolutionTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('devolution', function (Blueprint $table) {
            $table->id();
            
            $table->string('folio');
            $table->unsignedBigInteger('user_id');

            $table->morphs('object');
            $table->date('return_date');
            $table->smallInteger('extension')->default(0)->nullable();
            $table->timestamps();

            $table->index(['object_id', 'object_type']);
            $table->foreign('user_id')->references('id')->on('users');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('devolution');
    }
}
