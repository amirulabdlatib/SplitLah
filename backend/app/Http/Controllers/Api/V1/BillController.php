<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Bill;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;

class BillController extends Controller
{
    public function index()
    {
        $bills = Bill::with('participants:id,bill_id,status,amount_owed')
            ->where('user_id', Auth::id())
            ->latest()
            ->select('id', 'title', 'total_amount', 'due_date', 'status')
            ->get()
            ->map(function ($bill) {
                $totalParticipants = $bill->participants->count();
                $paidCount = $bill->participants->where('status', 'paid')->count();
                $collected = $bill->participants->where('status', 'paid')->sum('amount_owed');
                $percent = $bill->total_amount > 0
                    ? round(($collected / $bill->total_amount) * 100)
                    : 0;

                return [
                    'id'           => $bill->id,
                    'title'        => $bill->title,
                    'total'        => $bill->total_amount,
                    'collected'    => $collected,
                    'percent'      => $percent,
                    'participants' => $totalParticipants,
                    'paid'         => $paidCount,
                    'due_date'     => $bill->due_date,
                    'status'       => $bill->status,
                ];
            });

        return response()->json([
            'bills' => $bills,
        ]);
    }

    public function store(Request $request)
    {
        return response()->json([
            'message' => "Bill created successfully"
        ], Response::HTTP_CREATED);
    }
}
