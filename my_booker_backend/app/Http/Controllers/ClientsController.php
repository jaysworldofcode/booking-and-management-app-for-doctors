<?php

namespace App\Http\Controllers;

use Illuminate\Http\Requests;
use App\Http\Requests\ClientsPostRequest;
use App\Models\Clients;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;

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

        return response($clients, 200);
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
