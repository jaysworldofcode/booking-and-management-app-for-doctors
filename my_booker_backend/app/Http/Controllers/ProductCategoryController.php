<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ProductCategory;
use App\Http\Requests\ProductCategoriesPostRequest;
use App\Http\Requests\ProductCategoriesPutRequest;
use App\Repository\ProductCategoryRepository;

class ProductCategoryController extends Controller
{

    protected $productCategoryRepository;

    public function __construct(){
        $this->productCategoryRepository = new ProductCategoryRepository();
    }

    public function store(ProductCategoriesPostRequest $request){
        $category = $this->productCategoryRepository->store($request);

        return response($category, 200);
    }

    public function getCategory($id){
        $categories = $this->productCategoryRepository->getById($id);
        
        return response($categories, 200);
    }

    public function getAllClinicsCategory($clinic_id){
        $categories = $this->productCategoryRepository->allByClinic($clinic_id);
        
        return response($categories, 200);
    }


    public function deleteCategory($id){
        $this->productCategoryRepository->destroy($id);

        return response([
            'message' => "Category successfully deleted"
        ], 200);
    }

    public function updateCategory(ProductCategoriesPutRequest $request, $id){
        $category = ProductCategory::find($id);

        $this->productCategoryRepository->update($request, $id);

        return response([
            'message' => "Category successfully updated"
        ], 200);
    }
}
