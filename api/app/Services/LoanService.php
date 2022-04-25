<?php

namespace App\Services;

use App\Models\Devolution;
use App\Models\Loan;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Query\Builder;
use Illuminate\Support\Facades\DB;
use JetBrains\PhpStorm\ArrayShape;

/**
 *
 */
class LoanService
{
    protected static array $status = [ 'ok', 'extension', 'overtime', 'cancelled' ];

    /**
     * Get the next status based on current loan one
     *
     * @param array $data
     * @param Builder|object|Model]Loan|null $activeLoan
     * @return array
     */
    #[ArrayShape(['loan' => "mixed", 'devolution' => "mixed"])] public static function create(array $data = [], $activeLoan = null): array
    {
        // Validate if Loan already exists with user.id key
        if(!isset($activeLoan)) {
            $activeLoan = Loan::query()->where('user_id', $data['user_id'])
                ->whereHasMorph(
                    'object',
                    $data['object_type'],
                    function ($query) use ($data) {
                        $query->where('id', '=', $data['object_id']);
                    }
                )
                ->first();
        }

        if($activeLoan) {
            $oldDevolution = Devolution::query()->where('loan_id', '=', $activeLoan->id)->latest()->first();
            $oldDevolution->active = $oldDevolution->active == "cancelled" ? 1 : 0;
            $newStatus = self::getNextStatus($activeLoan->status);

            if($newStatus) {
                $activeLoan->status = $newStatus;
                $devolution = Devolution::query()->create([
                    'loan_id' => $activeLoan->id,
                    'return_date' => $data['return_date'],
                    'status_snapshot' => $newStatus,
                    'active' => 1,
                ]);
            } else {
                $devolution = $oldDevolution;
            }

            $oldDevolution->save();
            $loan = $activeLoan;
            $activeLoan->save();
        } else {
            $loan = Loan::query()->create($data);
            /** @noinspection PhpUndefinedFieldInspection */
            $devolution = $loan->devolutions->first();
        }
        return ['loan' => $loan, 'devolution' => $devolution];
    }

    /**
     * Get the next status based on current loan one
     *
     * @param string $currentStatus
     * @return string|null
     */
    public static function getNextStatus(string $currentStatus): ?string
    {
        // [ 'right', 'extension', 'overtime', 'cancelled' ];
        $statusList = self::$status;
        if ($currentStatus != "cancelled") {
            $idx = array_search($currentStatus, $statusList);
            return $statusList[$idx+1];
        }
        return null;
    }


    /**
     * Get loans with user and object relationships
     *
     * @return Builder
     */
    public static function getLoansWithRelations(): Builder
    {
        return DB::table('loans as l')
            ->join('users as u', 'u.id', '=', 'l.user_id')
            ->select(
                'l.id as id',
                'u.id as user_id',
                'u.username',
                'l.status',
                'l.details',
                'l.object_id',
                'l.object_type',
                DB::raw('(CASE WHEN l.object_type = "App\\\Models\\\BookCopy" THEN "Ejemplar" ELSE "Material" END) AS object_type'),
                DB::raw('(CASE
                    WHEN l.status = "ok" THEN "BIEN"
                    WHEN l.status = "extension" THEN "PRORROGA"
                    WHEN l.status = "overtime" THEN "PRORROGA+"
                    ELSE "CANCELADO" END
                ) AS status'),
            )
            ->orderBy('id');
        //'ok', 'extension', 'overtime', 'cancelled'
    }
}
