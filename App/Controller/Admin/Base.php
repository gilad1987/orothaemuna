<?php
class App_Controller_Admin_Base extends App_Controller
{
    protected function preDispatch()
    {
        $this->_view->pageTitle = 'אורות האמונה -מערכת ניהול';
        $this->_view->contentTitle = 'עמוד ראשי';
        parent::preDispatch();
    }

    protected function postDispatch()
    {
        $this->_view->pageContent = 'עמוד ללא תוכן';
        parent::postDispatch();
    }
    
    
    
    protected function insertOrUpdate(array $rows){
    	$model = $this->getModel();
    	$affected = $model->insertOrUpdate($rows);
    	return $affected;
    }
    
    protected function fetchAll(array $where = array(),$withJoin = false)
    {
    	$model = $this->getModel();
    	return $model->fetchAll($where,$withJoin);
    }
    
    protected function delete($id)
    {
    	$this->_view->setDisableView(true);
    	$model = $this->getModel();
    	$done = false;
    	if($model->delete($id)){
    		$done = true;
    	}
    	App_Headers::JSON();
		return json_encode(array('success' => $done));
    }
    
    protected function setQuery($query)
    {
    	
    }
    
}