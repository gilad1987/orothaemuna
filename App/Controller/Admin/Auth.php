<?php
class App_Controller_Admin_Auth extends App_Controller_Admin_Base
{
    protected function preDispatch()
    {
        parent::preDispatch();
        $this->_view->contentTitle = 'Login Page';
        $this->_view->pageTitle .= '- התחברות';
    }

    public function __construct()
    {
    	$this->_auth = App_Auth::getInstance();
    	parent::__construct();
    }
    public function loginAction()
    {
        $this->_http->setModuleName("login");
        return $this->_auth->loginAction();
    }
    
    public function isAuthAction()
    {
    	return $this->_auth->isAuthAction();
    }
}

