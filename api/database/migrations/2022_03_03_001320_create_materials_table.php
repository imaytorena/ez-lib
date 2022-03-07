<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMaterialsTable extends Migration
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
            $table->string('serial_number');
            $table->enum('option', ['computer', 'projector', 'peripherals', 'other']);
            $table->string('description')->nullable();
            $table->string('brand')->nullable();
            $table->string('model')->nullable();
            $table->enum('status', ['ok', 'has_details', 'new'])->default('ok')->nullable();
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
}
