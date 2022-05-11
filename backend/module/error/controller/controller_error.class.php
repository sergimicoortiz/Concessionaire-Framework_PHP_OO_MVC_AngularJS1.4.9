<?php

class controller_error
{
    function send_error()
    {
        echo json_encode(common::load_model('error_model', 'insert_error', [$_POST['type'], $_POST['msg']]));
    }
}//class