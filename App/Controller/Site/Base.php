<?php
class App_Controller_Site_Base extends App_Controller
{
    protected function preDispatch()
    {
        $this->_view->pageTitle = 'אורות האמונה ';
        $this->_view->contentTitle = 'עמוד ראשי';
        parent::preDispatch();
    }

    protected function postDispatch()
    {
        $this->_view->pageContent = 'עמוד ללא תוכן';
        parent::postDispatch();
    }
    
    protected function getModel()
    {
    	$ctrlNameArr = explode('_', get_class($this));
    	$modelName = 'App_Model_DbTable_'.$ctrlNameArr[count($ctrlNameArr)-1];
    	return new $modelName();
    }
    
    protected function insertOrUpdate(array $rows){
    	$model = $this->getModel();
    	$affected = $model->insertOrUpdate($rows);
    	return $affected;
    }
    
    protected function fetchAll($where,$withJoin = false)
    {
    	$model = $this->getModel();
    	return $model->fetchAll($where,$withJoin);
    }
    
    public function delete($id)
    {
    	$this->_view->setDisableView(true);
    	$model = $this->getModel();
    	$model->delete($id);
    	header('Content-type: text/json');
		header('Content-type: application/json');
		echo json_encode(array('done' => true));
    }
    
}