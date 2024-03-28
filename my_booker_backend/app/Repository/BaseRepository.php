<?php
namespace App\Repository;
use Carbon\Carbon;
class BaseRepository {
    public $model;
    
    public function allByClinic($clinic_id){
        return $this->model::where('clinic_id', '=', $clinic_id)->paginate(15);
    }
    public function getById($id){
        return $this->model->findorFail($id);
    }
    public function store($request){
        $request->created_at = Carbon::now();

        return $this->model::create($request->all());
    }
    public function update($request, $id){
        $category = $this->model::findorFail($id);
        $category->updated_at = Carbon::now();
        $category->visible = $request->visible;

        return $category->update($request->all());
    }
    public function destroy($id){
        $find = $this->model::findorFail($id);

        return $find->delete();
    }
}
