<?php
class App_Controller_Site_Index extends App_Controller_Site_Base
{
	const LAST_LESSONS_FOR_INDEX = 12;
	
    public function indexAction()
    {
        $this->getFilters();
        $controller = new App_Controller_Site_Lessons();
        $model = $controller->getModel();
        $last_lessons = $model->fetchAll(array(),true,self::LAST_LESSONS_FOR_INDEX,0,"`id` DESC");

//        $models = new App_Model_DbTable_Years();
//        $models= $models->fetchAll(array(),true);
//        $fp = fopen('mock/db/years.json', 'w');
//        fwrite($fp, json_encode($models));
//        fclose($fp);
        $this->_view->last_lessons = $last_lessons;
    }
    
   public function contactusAction()
   {
   		die('Not send');
	   	require_once 'App/Mailer/Phpmailer.php';
	   	require_once 'App/Mailer/POP3.php';
	   	require_once 'App/Mailer/SMTP.php';
	   	require_once 'App/Mailer/Mailer.php';
	   	
	   	die();
   }
}