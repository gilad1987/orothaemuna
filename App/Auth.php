<?php

class App_Auth
{
    private static $_instance;
    private static $user = null;
    private $_view;

    public static function getInstance()
    {
        if(self::$_instance === null)
            self::$_instance = new self();
        
        return self::$_instance;
    }

    private function __construct(){
    	$this->_view = App_View::getInstance();
    }
    
    public function getLoggedUser()
    {
		return self::$user;    	
    }
    
    public function loginAction()
    {
    	$http = App_Http::getInstance();
    	$fileds = array();
    	
    	$fileds['username'] = $http->username;
    	$fileds['password'] = $http->password;
    	
    	$validator = new App_Validator($fileds);
    	$fileds['username'] = $validator->string("invalid username")->validate('username');
    	$fileds['password'] = $validator->string("invalid password")->validate('password');
    	 
    	if($validator->hasErrors()){
    		if($this->_view->isXmlHttpRequest()){
	    		header('Content-type: text/json');
	    		header('Content-type: application/json');
	    		echo json_encode(array("error"=>$validator->getAllErrors()));
	    		die();
	    		return null;
    		}
    		return null;
    	}
    	$fileds['password'] = md5($fileds['password']);
    	$model = new App_Model_DbTable_Users();
    	$user = $model->fetchAll(array("users"=>$fileds));
    	if(empty($user)){
    		if($this->_view->isXmlHttpRequest()){
	    		header('Content-type: text/json');
	    		header('Content-type: application/json');
	    		echo json_encode(array("error"=>"invalid username / password"));
	    		die();
	    		return null;
    		}
    		return null;
    	}
    	$user = $user[0];
    	$session = App_Session::getInstance()->getInstance();
    	$token = md5($user->username.time().rand(10, 60));
    	$session->token = $token;
    	$fileds = array("id"=>$user->id,
    					"token"=>$token,
    					"last_login"=> date("Y-m-d H:i:s"),
    	    			"ip" => $_SERVER['SERVER_ADDR'],
    					"user_agent" => $_SERVER['HTTP_USER_AGENT']);
    	$rows = array($fileds);
    	if( !$model->insertOrUpdate($rows) ){
    		throw new Exception("Failed to connect user");
    	}
    	return $this->_view->user = self::$user = $user;
    }
    
    public function logoutAction()
    {
    	App_Session::getInstance()->destroy();
    }
    
    
    public function isAuthAction()
    {
    	$session = App_Session::getInstance();
    	$token = $session->token;
    	if(isset($token)){
    		$fileds = array("token"=>$token);
    		$validator = new App_Validator($fileds);
    		$validator->string("invalid username")->validate('token');
    	    if(!$validator->hasErrors()){
	    		$rows = array($fileds);
	    		$model = new App_Model_DbTable_Users();
	    		$user = $model->fetchAll(array("users"=>$fileds));
	    		if(!empty($user)){
		    		return $this->_view->user = self::$user = $user[0];
	    		}
    	    }
    	}
    	return $this->loginAction();
    }
}