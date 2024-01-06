<?php

namespace App\Http\Controllers;

use Illuminate\Http\Requests;
use App\Http\Requests\ClientsPostRequest;
use App\Models\Clients;
use App\Models\Appointments;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use Carbon\Carbon;

class ClientsController extends Controller
{
    public function store(ClientsPostRequest $request){
        $clients = Clients::create($request->all());

        return response($clients, 200);
    }

    public function index(){
        $clients = Clients::paginate(15);

        return response($clients, 200);
    }

    public function show($id){
        $clients = Clients::find($id);

        if($clients == false){
            return response([
                'message' => "Client doesn't exists"
            ], 400);
        }

        $appointment_today = Appointments::where('client_id', '=', $id)
            ->whereDate('schedule_datetime', Carbon::today())
            ->with('appointments_comments')
            ->get();

        $last_month_appointments = Appointments::whereMonth(
            'schedule_datetime', '=', Carbon::now()->subMonth()->month
        )->get();

        $successfull_appointments = Appointments::where('client_id', '=', $id)
            ->where('status', '=', '1')
            ->get();

        $cancelled_appointments = Appointments::where('client_id', '=', $id)
            ->where('status', '=', '2')
            ->get();

        $rescheduled_appointments = Appointments::where('client_id', '=', $id)
            ->where('status', '=', '3')
            ->get();

        return response([
            'client'                    => $clients,
            'appointments_today'        => $appointment_today,
            'last_month_appointments'   => $last_month_appointments,
            'appointments_count'      => [
                'success'       => count($successfull_appointments),
                'cancelled'     => count($cancelled_appointments),
                'rescheduled'   => count($rescheduled_appointments)
            ]
        ], 200);
    }

    public function update(ClientsPostRequest $request, $id){
        $clients = Clients::find($id);

        if($clients == false){
            return response([
                'message' => "Client doesn't exists"
            ], 400);
        }

        $clients->update($request->all());

        return response($clients, 200);
    }

    public function delete($id){
        $clients = Clients::find($id);

        if($clients == false){
            return response([
                'message' => "Client doesn't exists"
            ], 400);
        }

        $clients->delete();

        return response([
            'message' => "Clients successfully deleted"
        ], 200);
    }

    public function filter(){
        $results = Clients::where(function ($query) {
            if(request()->has('name') && request()->query('name')){
                $query->where('name', 'LIKE', '%'.request()->query('name').'%');
            }
        })
        ->orderBy('name')
        ->paginate(15);

        return response($results, 200);
    }
}
