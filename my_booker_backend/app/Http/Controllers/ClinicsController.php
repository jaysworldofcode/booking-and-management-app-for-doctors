<?php

namespace App\Http\Controllers;

use Illuminate\Http\Requests;
use App\Http\Requests\ClinicsPostRequest;
use App\Models\Clinics;
use App\Models\Clients;
use Illuminate\Support\Facades\DB;

class ClinicsController extends Controller
{
    public function store(ClinicsPostRequest $request){
        $product = Clinics::create($request->all());

        return response($product, 200);
    }

    public function index(){
        $clinics = Clinics::paginate(15);

        return response($clinics, 200);
    }

    public function show($id){
        $clinic = Clinics::find($id);

        if($clinic == false){
            return response([
                'message' => "Clinic doesn't exists"
            ], 400);
        }

        return response($clinic, 200);
    }

    public function delete($id){
        $clinic = Clinics::find($id);

        if($clinic == false){
            return response([
                'message' => "Clinic doesn't exists"
            ], 400);
        }

        $clinic->delete();

        return response([
            'message' => "Clinic successfully deleted"
        ], 200);
    }

    public function getUserClinics($owner_user_id){
        $user_clinics = Clinics::where('owner_user_id', '=', $owner_user_id)->paginate(15);

        return response($user_clinics, 200);
    }

    public function getClientsByClinic($clinic_id){
        $clients = Clients::where('clinic_id', '=', $clinic_id)->paginate(15);

        return response($clients, 200);
    }
}
