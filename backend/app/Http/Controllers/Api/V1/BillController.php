<?php

namespace App\Http\Controllers\Api\V1;

use App\Enums\BillStatus;
use App\Enums\ParticipantStatus;
use App\Http\Controllers\Controller;
use App\Models\Bill;
use App\Models\Participant;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;


class BillController extends Controller
{
    public function index()
    {
        $bills = Bill::with('participants:id,bill_id,status,amount_owed')
            ->where('user_id', Auth::id())
            ->latest()
            ->select('id', 'title', 'total_amount', 'due_date', 'status', 'bill_uuid')
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
                    'bill_uuid'    => $bill->bill_uuid,
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
        $validated = $request->validate([
            'title'                      => 'required|string|max:255',
            'description'                => 'nullable|string|max:1000',
            'total_amount'               => 'required|numeric|min:0.01',
            'split_type'                 => 'required|in:equal,custom',
            'due_date'                   => 'required|date|after_or_equal:today',
            'auto_confirm'               => 'boolean',
            'bill_file'                  => 'nullable|file|mimes:jpg,jpeg,png,pdf|max:5120',
            'participants'               => 'required|array|min:1',
            'participants.*.name'        => 'required|string|max:255',
            'participants.*.email'       => 'nullable|email|max:255|required_without:participants.*.phone',
            'participants.*.phone'       => 'nullable|string|max:20|required_without:participants.*.email',
            'participants.*.amount_owed' => 'required_if:split_type,custom|nullable|numeric|min:0',
        ], [
            'participants.*.name.required'           => 'Name is required.',
            'participants.*.email.required_without'  => 'Email or phone is required.',
            'participants.*.email.email'             => 'Invalid email address.',
            'participants.*.phone.required_without'  => 'Email or phone is required.',
            'participants.*.amount_owed'             => 'Participant amount owed is required'
        ]);

        if ($validated['split_type'] === 'custom') {
            $sum = collect($validated['participants'])->sum(fn($p) => (float) ($p['amount_owed'] ?? 0));
            if (abs($sum - (float) $validated['total_amount']) > 0.01) {
                throw ValidationException::withMessages([
                    'participants' => "Total participants amount (RM " . number_format($sum, 2) . ") must equal the bill total (RM " . number_format((float) $validated['total_amount'], 2) . ").",
                ]);
            }
        }

        $filePath = $request->hasFile('bill_file')
            ? $request->file('bill_file')->store('bills', 'private')
            : null;

        $equalShare = round((float) $validated['total_amount'] / count($validated['participants']), 2);

        DB::transaction(function () use ($validated, $filePath, $equalShare) {
            $bill = Bill::create([
                'user_id'           => Auth::id(),
                'bill_uuid'         => Str::uuid(),
                'title'             => $validated['title'],
                'description'       => $validated['description'] ?? null,
                'total_amount'      => $validated['total_amount'],
                'split_type'        => $validated['split_type'],
                'due_date'          => $validated['due_date'],
                'auto_confirm'      => $validated['auto_confirm'] ?? false,
                'bill_file_path'    => $filePath,
                'status'            => BillStatus::ACTIVE,
            ]);

            $participants = collect($validated['participants'])->map(fn($participant) => [
                'bill_id'     => $bill->id,
                'name'        => $participant['name'],
                'token'       => Str::uuid(),
                'email'       => $participant['email'] ?? null,
                'phone'       => $participant['phone'] ?? null,
                'amount_owed' => $validated['split_type'] === 'equal'
                    ? $equalShare
                    : (float) $participant['amount_owed'],
                'status'      => ParticipantStatus::PENDING->value,
                'created_at'  => now(),
                'updated_at'  => now(),
            ])->toArray();

            Participant::insert($participants);
        });

        return response()->json(
            ['message' => 'Bill created successfully'],
            Response::HTTP_CREATED
        );
    }

    public function destroy(String $bill_uuid)
    {
        $bill = Bill::where('bill_uuid', $bill_uuid)->first();

        if (!$bill) {
            return response()->json([
                'message' => 'Bill not found'
            ], Response::HTTP_NOT_FOUND);
        }

        if ($bill->user_id !== Auth::id()) {
            return response()->json([
                'message' => 'Unauthorized.'
            ], Response::HTTP_FORBIDDEN);
        }

        try {
            DB::transaction(function () use ($bill) {

                $participants = Participant::where('bill_id', $bill->id)->get();

                foreach ($participants as $participant) {
                    if ($participant->receipt_path && Storage::exists($participant->receipt_path)) {
                        Storage::delete($participant->receipt_path);
                    }
                }

                Participant::where('bill_id', $bill->id)->delete();

                if ($bill->bill_file_path && Storage::exists($bill->bill_file_path)) {
                    Storage::delete($bill->bill_file_path);
                }

                $bill->delete();
            });

            return response()->noContent();
        } catch (\Throwable $e) {

            Log::error('Failed to delete bill.', ['error' => $e->getMessage()]);

            return response()->json([
                'message' => 'Failed to delete bill.',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
