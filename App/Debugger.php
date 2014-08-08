<?php
/**
 * Created by Gilad.
 * User: Gilad
 * Date: 10/05/14
 * Time: 21:46
 */

class App_Debugger {

    private static $start_time;
    private static $end_time;
    private static $total;

    public static function setStart(){
        self::$start_time = microtime();
    }

    public static function setEnd(){
        self::$end_time = microtime();
        self::$total = self::$end_time - self::$start_time;
    }

    public static function getTotal(){
        return self::$total;
    }
}