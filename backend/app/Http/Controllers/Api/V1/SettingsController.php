<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class SettingsController extends Controller
{
    public function index()
    {
        $user = Auth::user();

        return response()->json([
            'bank_name' => $user->bank_name,
            'acc_no'    => $user->payment_acc_no,
            'qr_url'    => $user->qr_file_path
                ? Storage::disk('public')->url($user->qr_file_path)
                : null,
        ]);
    }

    public function update(Request $request)
    {
        $validated = $request->validate([
            'bank_name' => 'required|string|max:255',
            'acc_no'    => 'required|string|max:50',
            'qr_file'   => 'nullable|file|mimes:jpg,jpeg,png|max:2048',
        ]);

        $user = Auth::user();

        if ($request->hasFile('qr_file')) {
            if ($user->qr_file_path && Storage::disk('public')->exists($user->qr_file_path)) {
                Storage::disk('public')->delete($user->qr_file_path);
            }

            $validated['qr_file_path'] = $request->file('qr_file')
                ->store('qr_codes', 'public');
        }

        $user->update([
            'bank_name'      => $validated['bank_name'],
            'payment_acc_no' => $validated['acc_no'],
            'qr_file_path'   => $validated['qr_file_path'] ?? $user->qr_file_path,
        ]);

        $user->refresh();

        return response()->json([
            'message' => 'Settings updated successfully.',
            'qr_url'  => $user->qr_file_path
                ? Storage::disk('public')->url($user->qr_file_path)
                : null,
        ]);
    }
}
