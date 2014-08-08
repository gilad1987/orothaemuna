<?php
class App_Model_DbTable_Users extends App_Model_DbTable_Base
{
	public $fieldTypeByName = array(
		'id' 		=> 'i',
		'username' 	=> 's',
		'password' 	=> 's',
		'token' 	=> 's',
		'first_name'=> 's',
		'last_name' => 's',
		'last_login'=> 's',
		'ip'		=> 's',
		'user_agent'=> 's',
		'permission'=> 'i'
	);
	protected $fieldPDOTypeByName = array(
		'id' 		=> PDO::PARAM_INT,
		'username' 	=> PDO::PARAM_STR,
		'password' 	=> PDO::PARAM_STR,
		'token' 	=> PDO::PARAM_STR,
		'first_name'=> PDO::PARAM_STR,
		'last_name' => PDO::PARAM_STR,
		'last_login'=> PDO::PARAM_STR,
		'ip'		=> PDO::PARAM_STR,
		'user_agent'=> PDO::PARAM_STR,
		'permission'=> PDO::PARAM_INT
	);
}