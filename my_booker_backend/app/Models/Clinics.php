<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Clinics extends Model
{
    use HasFactory;

    protected $fillable = ['owner_user_id', 'name', 'date_established', 'contact_number', 'address', 'description', 'clinic_settings'];
}
