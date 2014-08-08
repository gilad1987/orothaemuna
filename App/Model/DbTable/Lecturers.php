<?php
class App_Model_DbTable_Lecturers extends App_Model_DbTable_Base
{
	protected $fieldTypeByName = array(
		'id' 			=> 'i',
		'text' 			=> 's',
		'display'		=> 'i',
	);
	protected $fieldPDOTypeByName = array(
		'id' 			=> PDO::PARAM_INT,
		'text' 			=> PDO::PARAM_STR,
		'display'		=> PDO::PARAM_INT,
	);
}