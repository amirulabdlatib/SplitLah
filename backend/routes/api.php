<?php

use App\Http\Controllers\Api\V1\BillController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    $user = $request->user();

    return response()->json([
        'id' => $user->id,
        'name' => $user->name,
        'email' => $user->email,
    ]);
});

Route::middleware(['throttle:600,1', 'auth:sanctum'])->group(function () {
    Route::prefix('v1')->group(function () {
        Route::get('/bills', [BillController::class, 'index']);
        Route::post('/bills', [BillController::class, 'create']);
    });
});
