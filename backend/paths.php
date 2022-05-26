<?php
//PROJECT
define('PROJECT', '/Concessionaire-Framework_PHP_OO_MVC_AngularJS1.4.9/backend/');

//SITE_ROOT
define('SITE_ROOT', $_SERVER['DOCUMENT_ROOT'] . PROJECT);

//SITE_PATH
define('SITE_PATH', 'http://' . $_SERVER['HTTP_HOST'] . "\/Concessionaire-Framework_PHP_OO_MVC_AngularJS1.4.9\/");

//PRODUCTION
define('PRODUCTION', true);

//MODEL
define('MODEL_PATH', SITE_ROOT . 'model/');

//MODULES
define('MODULES_PATH', SITE_ROOT . 'module/');

//RESOURCES
define('RESOURCES_PATH', SITE_ROOT . 'resources/');

//UTILS
define('UTILS_PATH', SITE_ROOT . 'utils/');

//URL_FRIENDLY  ON or OFF
define('URL_FRIENDLY', true);

//////////////ERROR//////////////

//MODEL
define('ERROR_MODEL_PATH', MODULES_PATH . 'error/model/MODEL/');

//////////////HOME//////////////

//MODEL
define('HOME_MODEL_PATH', MODULES_PATH . 'home/model/MODEL/');

//////////////SHOP//////////////

//MODEL
define('SHOP_MODEL_PATH', MODULES_PATH . 'shop/model/MODEL/');

//////////////SEARCH//////////////

//MODEL
define('SEARCH_MODEL_PATH', MODULES_PATH . 'search/model/MODEL/');

//////////////LOGIN//////////////

//MODEL
define('LOGIN_MODEL_PATH', MODULES_PATH . 'login/model/MODEL/');
