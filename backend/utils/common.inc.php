<?php
class common
{

    public static function load_model($model, $function = null, $args = null)
    {
        $dir = explode('_', $model);
        $path = constant(strtoupper($dir[0]) . '_MODEL_PATH') .  $model . '.class.singleton.php';
        if (file_exists($path)) {
            require_once($path);
            if (method_exists($model, $function)) {
                $obj = $model::getInstance();
                if ($args != null) {
                    return call_user_func(array($obj, $function), $args);
                }
                return call_user_func(array($obj, $function));
            }
        }
        throw new Exception();
    } //end load model

    public static function friendlyURL($url)
    {
        $link = "";
        if (URL_FRIENDLY) {
            $url = explode("&", str_replace("?", "", $url));
            foreach ($url as $key => $value) {
                $aux = explode("=", $value);
                $link .=  $aux[1] . "/";
            }
        } else {
            $link = "index.php?" . $url;
        } // end_else
        return SITE_PATH . $link;
    } // end friendlyURL

    public static function generate_token_secure($longitud = 20)
    {
        if ($longitud < 4) {
            $longitud = 4;
        }
        return bin2hex(openssl_random_pseudo_bytes(($longitud - ($longitud % 2)) / 2));
    } //end generate_token_secure
}//class