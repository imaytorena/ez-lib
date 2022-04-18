<?php

namespace App\Console\Commands;

use App\Models\Devolution;
use App\Models\Loan;
use App\Services\LoanService;
use Carbon\Carbon;
use Illuminate\Console\Command;

class ChangeLoanStatus extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'loans:status';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Validates all loan statuses previous (NOW) date to be reassigned';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle(): int
    {
        $this->info('Initiate validations and status changing');

        $pasts_devolution = Devolution::query()
            ->whereDate('return_date', '<', Carbon::now())->where('status_snapshot', '!=','cancelled')
            ->where('active', '=', 1)
            ->get();

        $this->info("Devolutions to be updated : ".count($pasts_devolution));

        $pasts_devolution->each(function ($devolution) {
            $loan = Loan::query()->where('id', '=', $devolution->loan_id)->first();
            $data = [ 'return_date' => Carbon::now()->addWeek() ];
            $obj_created = LoanService::create($data, $loan);

            $this->info("Loan (".$obj_created['loan']->id.") updated : Devolution status from (".$devolution->status_snapshot.") to (".$obj_created['devolution']->status_snapshot.")");
        });

        return 0;
    }
}
