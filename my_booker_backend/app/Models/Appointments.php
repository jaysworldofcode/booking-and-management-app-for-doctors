<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Appointments extends Model
{
    use HasFactory;

    protected $fillable = ['client_id', 'schedule_datetime', 'status', 'assignee', 'added_by', 'title', 'description'];


    public function appointments_comments()
    {
        return $this->hasMany("App\Models\AppointmentsComments", "appointments_id", "id")
            ->join('users', 'users.id', '=', 'appointments_comments.added_by')
            ->select('appointments_comments.*', 'users.name AS user_name', 'users.id AS user_id')
            ->orderBy('created_at', 'ASC');
    }
}
