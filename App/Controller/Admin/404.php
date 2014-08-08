<?php
class App_Controller_Admin_404 extends App_Controller_Admin_Base
{
	protected function preDispatch()
	{
		parent::preDispatch();
		$this->_view->pageTitle .= '- לא נמצא';
	}
	
	public function indexAction()
	{
		
	}
}