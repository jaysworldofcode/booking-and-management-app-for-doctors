<?php

namespace App\Repository;
use App\Repository\BaseRepository;
use App\Models\ProductCategory;

class ProductCategoryRepository extends BaseRepository {

    public function __construct(){
        $this->model = new ProductCategory;
    }
}
