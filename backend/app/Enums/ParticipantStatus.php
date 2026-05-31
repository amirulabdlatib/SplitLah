<?php

namespace App\Enums;

enum ParticipantStatus: string
{
    case PENDING = 'pending';
    case PAID = 'paid';
    case UNPAID = 'unpaid';
}
