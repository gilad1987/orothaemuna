<?php
class App_Controller_Admin_Filters extends App_Controller_Admin_Base
{
    public function indexAction()
    {
        
    }
    
    public function addAction(){
    	$this->_view->setDisableView(true);
    	$identifiers = array("1"=>"lecturers",
    						 "3"=>"locations",
    						 "2"=>"years",
    						 "4"=>"seriess");
    	$request = $this->_http;
    	
    	if(!is_numeric($request->filter_identifier) || !isset($identifiers[$request->filter_identifier])){
    		echo "invalid identifeir";
    		return false;
    	}
    	$filter_name = $request->filter_name;
    	if(!is_string($filter_name) || empty($filter_name)){
    		echo "invalid filter name";
    		return false;
    	}
    	
    	$tableName = isset($identifiers[$request->filter_identifier]) ? $identifiers[$request->filter_identifier] : null;
    	
    	if(!isset($tableName)){
    		throw new Exception("invalid filter");
    	}
    	
    	$modelName = "App_Model_DbTable_".ucfirst($tableName);
    	$model = new $modelName();
    	$row = array("text"=>$filter_name);
    	
    	echo json_encode(array("success"=>$model->insertOrUpdate(array($row))));
    }
}