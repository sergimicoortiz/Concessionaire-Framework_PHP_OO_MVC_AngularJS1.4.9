<?php

class controller_error
{
    function send_error()
    {
        common::load_model('error_model', 'insert_error', [$_GET['type'], $_GET['msg']]);
    }
}//class