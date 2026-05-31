<?php

namespace App\Models;

use App\Enums\ParticipantStatus;
use Illuminate\Database\Eloquent\Model;

class Participant extends Model
{
    protected $fillable = [
        'bill_id',
        'name',
        'phone',
        'email',
        'amount_owed',
        'token',
        'status',
        'receipt_path',
        'paid_at',
    ];

    protected $casts = [
        'paid_at' => 'datetime',
        'status' => ParticipantStatus::class,

    ];

    public function bill()
    {
        return $this->belongsTo(Bill::class);
    }
}
