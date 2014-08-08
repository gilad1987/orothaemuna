<?php
// define('BASE_PATH', basename(dirname(__FILE__)));
// if($_SERVER['SERVER_PORT'] != "8066" && !isset($_GET['gt_test'])){
// 	die();
// }asd

//ini_set('max_execution_time', 123456);
require_once 'App/Dispatcher.php';
App_Dispatcher::run();