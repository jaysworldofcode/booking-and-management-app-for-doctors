<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ClientsPostRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'clinic_id'         => ['required'],
            'name'              => ['required', 'max:70'],
            'contact_number'    => ['required', 'max:20'],
            'address'           => ['required', 'max:70'],
            'birthdate'         => ['required'],
            'gender'            => ['required']
        ];
    }
}