<?php

namespace App\Classes;

use Illuminate\Support\Facades\DB;

class Pager
{
    protected $pageIndex;
    protected $pageSize;
    protected $search;
    protected $sortBy;
    protected $columns;

    function __construct($requestData, $columnsSearch = [])
    {
        $this->pageIndex = isset($requestData['pageIndex']) ? (int)$requestData['pageIndex'] : 0;
        $this->pageSize = isset($requestData['pageSize']) ? (int)$requestData['pageSize'] : 20;
        $this->search = $requestData['search'] ?? null;
        $this->sortBy = $requestData['sortBy'] ?? [["id" => "id", "desc" => "false"]];
        $this->columns = $columnsSearch;

    }

    public function concat()
    {
        $concat = "CONCAT(";
        $count = count($this->columns) - 1;
        foreach ($this->columns as $key => $value) {
            $concat .= "COALESCE($value, '')";
            if ($key < $count)
                $concat .= ", ' ', ";
        }
        $concat .= ")";

        return $concat;
    }

    public function search($query)
    {
        if ($this->search && count($this->columns)) {

            $words = explode(" ", trim($this->search));
            $concat = $this->concat();
            foreach ($words as $key => $value) {
                if (!empty($value)) {
                    if ($key > 0) {
                        $query->orWhere(DB::raw($concat), 'LIKE', "%$value%");
                    } else {
                        $query->where(DB::raw($concat), 'LIKE', "%$value%");
                    }
                }
            }

        }

        return $query;
    }

    public function sort($query)
    {
        foreach ($this->sortBy as $sort) {
            if ($sort['desc'] === true || $sort['desc'] === 'true' || $sort['desc'] === 1 || $sort['desc'] === '1') {
                $query->orderBy($sort['id'], 'desc');
            } else {
                $query->orderBy($sort['id']);
            }
        }

        return $query;
    }

    public function paginate($query)
    {
        return $query->limit($this->pageSize)->offset($this->pageIndex * $this->pageSize);
    }

    public function response($data, $totalOfItems)
    {
        $pageCount = ceil(($totalOfItems / $this->pageSize));
        $pageCount = $pageCount < 1 ? 0 : $pageCount - 1;
        return [
            "pageIndex" => $this->pageIndex,
            "pageSize" => $this->pageSize,
            "pageCount" => $pageCount,
            "totalOfItems" => $totalOfItems,
            "numberOfItems" => count($data),
            "canNextPage" => $this->pageIndex < $pageCount,
            "canPreviousPage" => $this->pageIndex > 0,
            "search" => $this->search,
            "sortBy" => $this->sortBy,
            "data" => $data
        ];
    }

}
