<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\AppointmentsPostRequest;
use App\Http\Requests\AppointmentsUpdateStatusRequest;
use App\Models\Appointments;

class AppointmentsController extends Controller
{
    public function store(AppointmentsPostRequest $request){
        $appointment = Appointments::create($request->all());

        return response($appointment, 200);
    }

    public function filter(){
        $results = Appointments::where(function ($query) {
            if(request()->has('from') && request()->has('to') && request()->query('from') && request()->query('to')){
                $query->whereBetween('schedule_datetime', [
                    request()->query('from'),
                    request()->query('to')
                ]);
            }

            if(request()->has('client_id') && request()->query('client_id')){
                $query->where('client_id', '=', request()->query('client_id'));
            }

            if(request()->has('status') && request()->query('status')){
                $query->where('status', '=', request()->query('status'));
            }
        })
        ->with('appointments_comments')
        ->orderBy('schedule_datetime')
        ->paginate(15);

        return response($results, 200);
    }

    public function updateStatus(AppointmentsUpdateStatusRequest $request, $id){
        $appointment = Appointments::find($id);

        if($appointment == false){
            return response([
                'message' => "Appointment doesn't exists"
            ], 400);
        }

        $appointment->update(array(
            'status' => $request['status']
        ));

        return response($appointment, 200);
    }
}
