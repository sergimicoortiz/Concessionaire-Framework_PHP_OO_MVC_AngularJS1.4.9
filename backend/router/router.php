<?php
//require_once('paths.php');
//require_once('utils/common.inc.php');
require_once('autoload.php');
$_POST = json_decode(file_get_contents('php://input'), true);
class router
{
    private $uriModule;
    private $uriFunction;
    private $nameModule;
    static $_instance;

    public static function getInstance()
    {
        if (!(self::$_instance instanceof self)) {
            self::$_instance = new self();
        }
        return self::$_instance;
    } //getInstance

    function __construct()
    {
        if (isset($_GET['page'])) {
            $this->uriModule = $_GET['page'];
        } else {
            $this->uriModule = 'home';
        }
        if (isset($_GET['op'])) {
            $this->uriFunction = ($_GET['op'] === "") ? 'view' : $_GET['op'];
        } else {
            $this->uriFunction = 'view';
        }
    } //constructor

    function routingStart()
    {
        try {
            call_user_func(array($this->loadModule(), $this->loadFunction()));
        } catch (Exception $e) {
            echo $e;
            //common::load_error();
            //common::load_error_debug($e);
        }
    } //routinStart

    private function loadModule()
    {
        if (file_exists('resources/modules.xml')) {
            $modules = simplexml_load_file('resources/modules.xml');
            foreach ($modules as $row) {
                if (in_array($this->uriModule, (array) $row->uri)) {
                    $path = MODULES_PATH . $row->name . '/controller/controller_' . (string) $row->name . '.class.php';
                    if (file_exists($path)) {
                        require_once($path);
                        $controllerName = 'controller_' . (string) $row->name;
                        $this->nameModule = (string) $row->name;
                        return new $controllerName;
                    }
                }
            }
        }
        throw new Exception('Not Module found.');
    } //loadModule

    private function loadFunction()
    {
        $path = MODULES_PATH . $this->nameModule . '/resources/function.xml';
        if (file_exists($path)) {
            $functions = simplexml_load_file($path);
            foreach ($functions as $row) {
                if (in_array($this->uriFunction, (array) $row->uri)) {
                    return (string) $row->name;
                }
            }
        }
        throw new Exception('Not Function found.');
    } //loadFunction
} //class

router::getInstance()->routingStart();
