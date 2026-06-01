<?php

namespace App\Http\Controllers\Api\V1;

use App\Enums\ParticipantStatus;
use App\Http\Controllers\Controller;
use App\Models\Participant;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class PaymentController extends Controller
{
    public function index(string $token)
    {
        $participant = Participant::where('token', $token)->first();

        if (!$participant) {
            return response()->json([
                'message' => 'Payment not found'
            ], Response::HTTP_NOT_FOUND);
        }

        $bill = $participant->bill;

        return response()->json([
            'bill' => [
                'title'       => $bill->title,
                'description' => $bill->description,
                'total_amount' => $bill->total_amount,
                'due_date'    => $bill->due_date->format('d M Y'),
                'organiser'   => [
                    'name'            => $bill->user->name,
                    'bank_name'       => $bill->user->bank_name,
                    'payment_acc_no'  => $bill->user->payment_acc_no,
                    'qr_file_path'    => $bill->user->qr_file_path,
                ],
            ],
            'current_participant' => [
                'id'          => $participant->id,
                'name'        => $participant->name,
                'amount_owed' => $participant->amount_owed,
                'status'      => $participant->status,
            ],
            'participants' => $bill->participants->map(fn($p) => [
                'id'          => $p->id,
                'name'        => $p->name,
                'amount_owed' => $p->amount_owed,
                'status'      => $p->status,
            ]),
        ]);
    }

    public function update(Request $request, string $token)
    {
        $participant = Participant::where('token', $token)->first();

        if (!$participant) {
            return response()->json([
                'message' => 'Payment not found'
            ], Response::HTTP_NOT_FOUND);
        }

        if ($participant->status === ParticipantStatus::PAID) {
            return response()->json([
                'message' => 'Payment already confirmed'
            ], Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        if ($request->hasFile('receipt')) {
            $path = $request->file('receipt')->store('receipts', 'private');
            $participant->receipt_path = $path;
        }

        $participant->update([
            'status'  => $participant->bill->auto_confirm ? ParticipantStatus::PAID : ParticipantStatus::PENDING,
            'paid_at' => now(),
            'receipt_path' => $path ?? null,
        ]);

        return response()->json([
            'message' => 'Payment submitted successfully',
            'status'  => $participant->status,
        ]);
    }
}
