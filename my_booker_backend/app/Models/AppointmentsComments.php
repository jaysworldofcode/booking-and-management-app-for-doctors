<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AppointmentsComments extends Model
{
    use HasFactory;

    protected $fillable = ['attachments', 'comment', 'appointments_id', 'added_by'];
}
