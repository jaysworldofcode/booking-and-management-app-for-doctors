<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\AppointmentsCommentsPostRequest;
use App\Models\AppointmentsComments;

class AppointmentsCommentsController extends Controller
{
    public function store(AppointmentsCommentsPostRequest $request){
        $requestData = $request->all();
        $requestData['attachments'] = json_encode($requestData['attachments']);
        $appointment = AppointmentsComments::create($requestData);
        $appointment['attachments'] = json_decode($appointment['attachments']);

        return response($appointment, 200);
    }

    public function show($appointments_id){
        $appointment_details = AppointmentsComments::where('appointments_id', '=', $appointments_id)
        ->join('users', 'users.id', '=', 'appointments_comments.added_by')
        ->select('appointments_comments.*', 'users.name AS user_name', 'users.id AS user_id')
        ->orderBy('created_at', 'ASC')
        ->get();

        return response($appointment_details, 200);
    }
}
