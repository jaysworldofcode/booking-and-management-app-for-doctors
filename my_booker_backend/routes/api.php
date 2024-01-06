<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ClinicsController;
use App\Http\Controllers\ClientsController;
use App\Http\Controllers\AppointmentsController;
use App\Http\Controllers\AppointmentsCommentsController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// clinics api
Route::post('/clinics', [ClinicsController::class, 'store']);
Route::get('/clinics', [ClinicsController::class, 'index']);
Route::get('/clinics/{id}', [ClinicsController::class, 'show']);
Route::delete('/clinics/{id}', [ClinicsController::class, 'delete']);
Route::get('/user_clinics/{owner_user_id}', [ClinicsController::class, 'getUserClinics']);
Route::get('/clinics/get_clients/{clinic_id}', [ClinicsController::class, 'getClientsByClinic']);

// clients api
Route::post('/clients', [ClientsController::class, 'store']);
Route::get('/clients', [ClientsController::class, 'index']);
Route::get('/clients/filter', [ClientsController::class, 'filter']);
Route::get('/clients/{id}', [ClientsController::class, 'show']);
Route::put('/clients/{id}', [ClientsController::class, 'update']);
Route::delete('/clients/{id}', [ClientsController::class, 'delete']);

// appointments api
Route::post('/appointments', [AppointmentsController::class, 'store']);
Route::get('/appointments/filter', [AppointmentsController::class, 'filter']);
Route::put('/appointments/{id}', [AppointmentsController::class, 'updateStatus']);

// appointments comment api
Route::post('/appointments/comment', [AppointmentsCommentsController::class, 'store']);
Route::get('/appointments/comment/{appointments_id}', [AppointmentsCommentsController::class, 'show']);