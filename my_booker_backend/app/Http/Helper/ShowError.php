<?php

namespace App\Http\Helper;

use Exception;

class ResponseHelper extends Exception {

    function __construct($message = null, $code = 400){
        parent::__construct($message, $code);
    }
}
