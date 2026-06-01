<?php

use App\Http\Controllers\Api\V1\BillController;
use App\Http\Controllers\Api\V1\PaymentController;
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
        Route::middleware('auth:sanctum')->group(function () {
            Route::get('/bills', [BillController::class, 'index']);
            Route::get('/bills/{bill_uuid}', [BillController::class, 'show']);
            Route::post('/bills', [BillController::class, 'store']);
            Route::delete('/bills/{bill_uuid}', [BillController::class, 'destroy']);
        });

        Route::get('/payments/{token}', [PaymentController::class, 'index']);
        Route::patch('/payments/{token}', [PaymentController::class, 'update']);
    });
});
