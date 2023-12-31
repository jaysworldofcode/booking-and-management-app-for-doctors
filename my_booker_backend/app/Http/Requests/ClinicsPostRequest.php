<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ClinicsPostRequest extends FormRequest
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
            'owner_user_id'     => ['required'],
            'name'              => ['required', 'max:70'],
            'contact_number'    => ['required', 'max:20'],
            'address'           => ['required', 'max:70'],
            'description'       => ['required', 'max:100']
        ];
    }
}