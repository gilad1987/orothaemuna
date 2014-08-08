<?php
class App_Model_DbTable_Lessons extends App_Model_DbTable_Base
{
    // UPDATE orothaemuna.lessons SET `file_name` = replace(`new_src`,'public/mp3_uploads/','') WHERE id>0

    /**
     * @var array
     */
    public $fieldTypeByName = array(
		'id' 				=> PDO::PARAM_INT,
		'series_id' 		=> PDO::PARAM_INT,
		'year_id' 			=> PDO::PARAM_INT,
		'lecturer_id' 		=> PDO::PARAM_INT,
		'location_id' 		=> PDO::PARAM_INT,
		'name' 				=> PDO::PARAM_STR,
		'number' 			=> PDO::PARAM_INT,
		'date' 				=> PDO::PARAM_STR,
		'suffix' 			=> PDO::PARAM_STR,
		'new_src' 			=> PDO::PARAM_STR,
		'old_src' 			=> PDO::PARAM_STR,
		'youtube' 			=> PDO::PARAM_STR,
		'display' 			=> PDO::PARAM_INT,
		'publish' 			=> PDO::PARAM_INT,
		'download_count'	=> PDO::PARAM_INT,
		'video_src'			=> PDO::PARAM_STR,
		'source' 			=> PDO::PARAM_STR,
		'summary' 			=> PDO::PARAM_STR,
		'full_source'		=> PDO::PARAM_STR,
		'token'				=> PDO::PARAM_STR,
		'duration_hhmmss'	=> PDO::PARAM_STR,
		'duration'			=> PDO::PARAM_STR,
        'file_name'			=> PDO::PARAM_STR,
        'user_id'	=> PDO::PARAM_INT,
        'last_time_update'	=> PDO::PARAM_INT,
	);

    /**
     * @var array
     */
    protected $fieldPDOTypeByName = array(
		'token'				=> PDO::PARAM_STR,
		'id' 				=> PDO::PARAM_INT,
		'series_id' 		=> PDO::PARAM_INT,
		'year_id' 			=> PDO::PARAM_INT,
		'lecturer_id' 		=> PDO::PARAM_INT,
		'location_id' 		=> PDO::PARAM_INT,
        'user_id'	        => PDO::PARAM_INT,
		'name' 				=> PDO::PARAM_STR,
		'number' 			=> PDO::PARAM_INT,
		'date' 				=> PDO::PARAM_STR,
		'suffix' 			=> PDO::PARAM_STR,
		'new_src' 			=> PDO::PARAM_STR,
		'old_src' 			=> PDO::PARAM_STR,
		'youtube' 			=> PDO::PARAM_STR,
		'display' 			=> PDO::PARAM_INT,
		'publish' 			=> PDO::PARAM_INT,
		'download_count'	=> PDO::PARAM_INT,
		'video_src'			=> PDO::PARAM_STR,
		'source' 			=> PDO::PARAM_STR,
		'summary' 			=> PDO::PARAM_STR,
		'full_source'		=> PDO::PARAM_STR,
		'duration_hhmmss'	=> PDO::PARAM_STR,
		'duration'			=> PDO::PARAM_STR,
        'file_name'			=> PDO::PARAM_STR,
        'last_time_update'	=> PDO::PARAM_STR,

	);
}