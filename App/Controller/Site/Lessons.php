<?php
class App_Controller_Site_Lessons extends App_Controller_Admin_Base
{
	public function filterAction($return_val=false)
	{

		$this->_view->setDisableView(true);
		$requeset = $this->_http;

        /*
        $fields = array();

        if($requeset->filter_name == null){
            throw new App_Request_Params_Exceptions('invalid -  filter  - param');
        }

        $filterFequestParams = array('year_id','lecturer_id','series_id','location_id');
        foreach($filterFequestParams as $paramName){

            $paramVal = $requeset->$paramName;

            if($paramVal == null && is_numeric($paramVal)){
                throw new App_Request_Params_Exceptions('invalid - '.$paramName.' - param');
            }

            $fields[$paramName] = $paramVal;

        }

        $response = array();

        $response['filter_name'] = $requeset->filter_name;
        $model = $this->getModel();
        $rows = $model->fetchAll(array("lessons"=>$fields),true);


        */

        if($requeset->filter_name == null){
            throw new App_Request_Params_Exceptions('invalid -  filter  - param');
        }

		$field_distinct = $requeset->filter_name;
		$fields = array('year_id','lecturer_id','series_id','location_id');
		$tables = array('year_id'=>'years','lecturer_id'=>'lecturers','series_id'=>'seriess','location_id'=>'locations');
		$where = '';
		$select_field = '';
	
		foreach ($fields as $field_name){
                if(!is_numeric($requeset->$field_name)){
                   throw new App_Request_Params_Exceptions('invalid - '.$field_name.' - param');
                }

				if($requeset->$field_name){
					$where .="`{$field_name}`='{$requeset->$field_name}' AND";
				}
				if($field_name == $field_distinct){
					$select_field = "DISTINCT `lessons`.`{$field_distinct}` ,".$select_field;
				}else{
					$select_field .= "`lessons`.`{$field_name}`,";
				}
		}
			 
		if($field_distinct == "number"){
			$select_field .= "`lessons`.`token`,`lessons`.`new_src`";
			$join = '';
		}else{
			$select_field .= "`{$tables[$field_distinct]}`.`text`";
			$join="JOIN `{$tables[$field_distinct]}` ON `{$tables[$field_distinct]}`.`id` = `lessons`.`{$field_distinct}`";
		}
		
		$where = trim($where,"AND");
		$select_field = trim($select_field,",");
		$select_field .= ",`lessons`.`number`,`lessons`.`id`";
		$dbSchema = DB_SCHEMA;
		$query ='SELECT '.$select_field.' FROM `'.$dbSchema.'`.`lessons` '.$join.' WHERE'.$where." GROUP BY(`lessons`.`{$field_distinct}`)";
		 
		$conn = App_Db::getInstance()->getConn();

        if (!($stmt = $conn->prepare($query))) {
            $error = "error";
            if(DISPLAY_MYSQL_ERRORS){
                $error = "Prepare failed: " .$conn->errorInfo();
            }
            throw new App_Mysql_Exceptions( $error );
        }

        if (!$stmt->execute()) {
            $error = "error";
            if(DISPLAY_MYSQL_ERRORS){
                $error = "Execute failed: " .$conn->errorInfo();
            }
            throw new App_Mysql_Exceptions( $error );
        }


		$result = $stmt->fetchAll(PDO::FETCH_OBJ);

        $view_params = &$this->_view->response_params;

//		if(!$return_val){
//		    App_Headers::JSON();
//		    echo json_encode(array("objects"=>$result,"filter_name"=>$field_distinct,'token'=>App_CSRFUtil::getInstance()->getToken(true)));
//		}else{
//		    return array("objects"=>$result,"filter_name"=>$field_distinct);
//		}
        if(!$return_val){
            $view_params['objects'] = $result;
            $view_params['filter_name'] = $field_distinct;
            $view_params['objects'] = $result;
        }else{
            return array("objects"=>$result,"filter_name"=>$field_distinct);
        }


	}
	
	public function loadfileAction()
	{
		$this->_view->setDisableView(true);
		$requeset = $this->_http;
		$model = $this->getModel();
		$ret = null;
		
		$rows = $model->fetchAll(array("lessons"=>array(
												"year_id"=>$requeset->year_id,
												"number"=>$requeset->number,
												"location_id"=>$requeset->location_id,
												"series_id"=>$requeset->series_id,
												"lecturer_id"=>$requeset->lecturer_id,
												
		)),true);
		
		if(isset($rows[0])){

			$ret = array('lecturer'=>isset($rows[0]->lecturers_text)?$rows[0]->lecturers_text:null,
						'location'=>isset($rows[0]->locations_text)?$rows[0]->locations_text:null,
						'src'=>isset($rows[0]->new_src)?$rows[0]->new_src:null,
						'series'=>isset($rows[0]->seriess_text)?$rows[0]->seriess_text:null,
						'year'=>isset($rows[0]->years_text)?$rows[0]->years_text:null,
						'number'=>isset($rows[0]->number)?$rows[0]->number:null,
						'duration'=>isset($rows[0]->duration_hhmmss)?$rows[0]->duration_hhmmss:null,
						'id'=>$rows[0]->id,
			);
		}

        $view_params = &$this->_view->response_params;
        $view_params['lesson'] = $ret;
	}
	
	public function downloadAction()
	{
        if(!App_CSRFUtil::getInstance()->isValid()){
            throw new App_Request_Params_Exceptions('Invalid token');
        }

        $requeset = $this->_http;

		if($requeset->id){
			 $where = array('lessons'=>array('id'=>$requeset->id));
		}
		$rows = $this->fetchAll($where,true,1);
		
		// update for stats
		$update = array(
					array(
							'id'=>$rows[0]->id,
							'download_count'=>$rows[0]->download_count+1)
		);
 		$this->insertOrUpdate($update);

		if(isset($rows[0])){
			$file_name = $rows[0]->lecturers_text.' - '.$rows[0]->locations_text.' - '.$rows[0]->name.' - '.$rows[0]->date.' - '.'מספר שיעור'.' - '.$rows[0]->number.'.mp3';
			$src= App_Config::$base_url.$rows[0]->new_src;
			
			App_Headers::download($file_name);
			die(file_get_contents($src));
		}
	}
}