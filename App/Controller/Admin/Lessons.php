<?php
class App_Controller_Admin_Lessons extends App_Controller_Admin_Base
{
	const SELECT_DEFAULT_VALUE = 0;
	const UPLOAD_DIR = "uploads/";
	const AFTER_UPLOAD_DIR = "public/mp3_uploads/";
	const CSV_FILE_NAME = "orothaemuna_template";
	
	protected function preDispatch()
	{
		parent::preDispatch();
		$this->_view->contentTitle = 'Lessons Page';
	}
	
	public function loadcsvAction()
	{
        return;
        $handle = fopen('assets/'.self::CSV_FILE_NAME.".csv", "r");
		$model = new App_Model_DbTable_Lessons();
		$rows = array();
		$fileds_name = null;
        require_once 'App/lib/getid3/getid3.php';
		while ($row = fgetcsv($handle,10000))
		{
			if($fileds_name != null){
				$new_row = array();
				$new_row['new_src'] = null;
				foreach ($row as $key=>$val){
					if(strlen($fileds_name[0])== 12){
						$keyy = substr($fileds_name[$key],-9);
						$fileds_name[0]=$keyy;
					}
					if($fileds_name[$key] == "old_src" && !empty($val)){
						if($this->checkIsFile($val)){
							$new_row['new_src'] = $this->getRandomFileName(true);
                            $new_row['new_src'] = $this->getRandomFileName(true);
							$val = iconv('windows-1255','UTF-8', $val );


                            $mp3file = null;
 							$mp3file = new App_Mp3file($val);
 							$metadata = $mp3file->get_metadata();

                            $instanse = null;
                            $instanse = new getID3();
                            $id3tags = $instanse->analyze($val);
                            //'duration_id3tag'=>$id3tags['playtime_string']

 							$new_row['duration'] = $metadata['Length'];
 							$new_row['duration_hhmmss'] = $id3tags['playtime_string'];
							
						}else{
							$val = null;
						}
					}
					if(empty($val)){
						$val = null;
					}

					$new_row[$fileds_name[$key]]  = $val;
				}

                $new_row['user_id_update'] = App_Auth::getInstance()->getLoggedUser()->id;
                $new_row['last_time_update'] = date("Y-m-d H:i:s");

				$rows[] = $new_row;
			}
			
			if($fileds_name == null){
				$fileds_name = $row;
			}
			
		}
//
        App_Headers::textPlain();
		var_dump($rows);
		die();
// 		$this->addOrUpdate($rows);
	}
	
	
	public function indexAction()
	{
		$this->_view->pageTitle = ' רשימת שיעורים ';
		$model = $this->getModel();
		$rows = $model->fetchAll(array("lessons"=>array("display"=>1)),true);
		$this->_view->lessons = $rows;		
	}
	
	public function deleteAction()
	{
		$id = $this->_http->getParam("id");
		if(!isset($id) || !is_numeric($id)){
			throw  new Exception("invalid id");
		}	
		echo $this->delete($id); 
	}
	
	private function checkIsFile($fileName)
	{
		return is_file($fileName);
	}
	
	private function changeDestinationFile($rows)
	{
		foreach ($rows as $row){
			if(empty($row['old_src']) || empty($row['new_src'])){
				continue;
			}
			$old_destination = iconv ("UTF-8","windows-1255", $row['old_src'] );
			if($this->checkIsFile($old_destination)){
				if(copy($old_destination, $row['new_src'])){
// 					unlink($old_destination);
				}
			}
		}
	}
	
	protected function addOrUpdate($rows,$changeDerinationFile = true){
		if(!is_array($rows) || !$result = $this->insertOrUpdate($rows)){
			throw new Exception("Error in insert or update lesson");
		}
		
		$this->changeDestinationFile($rows);
//		App_Headers::JSON();
//		echo json_encode(array("success"=>true));
        $this->_view->response_params['success']=true;
	}	
	
	private function validateBeforeInsert()
	{
		$model = $this->getModel();
		$fileds = array();
		$filedsFromPost = array();
		
		$is_update = false;
		$fileds= array();
		$request = $this->_http;
		
		if($request->id){
			$is_update = true;
			$fileds['id'] = $request->id;
		}
		
		foreach ($model->fieldTypeByName as $fieldName=>$val){
			if($paramsVal = $request->$fieldName){
				$filedsFromPost[$fieldName] = $paramsVal;
			}
		}
		
		if($request->voice_ftp_url){
			$filedsFromPost['voice_ftp_url'] = self::UPLOAD_DIR.$request->voice_ftp_url;
		}
		$validator = new App_Validator($filedsFromPost);
		
		$fileds['number'] = $validator->integer("invalid number")->validate('number');
		$fileds['date'] = $validator->string("invalid date")->validate('date');
		$fileds['name'] = $validator->string("invalid name")->validate('name');
		$fileds['series_id'] = $validator->min(1,true,"invalid series_id")->validate('series_id');
		$fileds['location_id'] = $validator->min(1,true,"invalid location_id")->validate('location_id');
		$fileds['year_id'] = $validator->min(1,true,"invalid year_id")->validate('year_id');
		$fileds['lecturer_id'] = $validator->min(1,true,"invalid lecturer_id")->validate('lecturer_id');
		
		$bool = empty($filedsFromPost['voice_ftp_url']);
		if(!$is_update || ($is_update && !empty($filedsFromPost['voice_ftp_url']))){
			$fileds['old_src'] = $validator->file("invalid voice_ftp_url")->validate('voice_ftp_url');
		}
		
		if($validator->hasErrors()){
			App_Headers::JSON();
			echo json_encode($validator->getAllErrors());
			return false;
		}
		
		$fileds['new_src'] =  $this->getRandomFileName(true);
		
		return  array($fileds);
	}
	
	protected function getRandomFileName($addDirPrefix = false)
	{
		$rand = md5(time().rand(1000,9999).uniqid())."_".rand(1000,9999).".mp3";
		if($addDirPrefix){
			$rand = self::AFTER_UPLOAD_DIR.$rand;
		}
		return $rand;
	}
	
    public function addAction()
    {
    	if($this->_view->isXmlHttpRequest()){
    		$this->_view->setDisableView(true);
    		if($rows = $this->validateBeforeInsert()){
    			return $this->addOrUpdate($rows);
    		}
    	}
    	
    	$user = App_Auth::getInstance()->getLoggedUser();
    	if(empty($user)){
    		throw new Exception("no logged user");
    	}
    	
    	$this->_view->pageTitle = ' הוספת שיעור ';
		$this->getFilters();
    }
    
    public function updateAction()
    {
        if($this->_view->isXmlHttpRequest()){
    		$this->_view->setDisableView(true);
        	if($rows = $this->validateBeforeInsert()){
	 			return $this->addOrUpdate($rows);
        	}
        	return;
    	}
    	
    	$this->_view->tempaleName = "add";
    	$this->addAction();
    	$this->_view->pageTitle = ' עדכון שיעור ';
    	if(isset($_GET['lesson']) && is_numeric($_GET['lesson'])){
    		$lesson = $_GET['lesson'];
    	}
    	if(isset($lesson)){
    		$row = $this->fetchAll(array("lessons"=>array("id"=>$lesson)),true);
    		$this->_view->lesson = $row[0];
    	}
    	if(!isset($lesson) || !isset($this->_view->lesson)){
    		throw new Exception("ניסית לגשת לעמוד שאינו קיים.");
    	}
    }
    
    public function updatedurationAction()
    {
    	return;
    	$lessons = $this->fetchAll();
    	$rows = array();
        require_once 'App/lib/getid3/getid3.php';

    	foreach ($lessons as $key=>$lesson){
//            if($key>50){
//                break;
//            }
//            $mp3file =null;
//			$mp3file = new App_Mp3file($lesson->new_src);
//			$m_data = $mp3file->get_metadata();

            $instanse = null;
            $instanse = new getID3();
            $id3tags = $instanse->analyze($lesson->new_src);

    		$rows[] =  array(
				'id'=>$lesson->id,
//				'duration'=>$m_data['Length'],
     			'src'=>$lesson->new_src,
//                'suration_on_db'=>$lesson->duration_hhmmss,
//				'duration_hhmmss'=>$m_data['Length hh:mm:ss'],
                'duration_id3tag'=>$id3tags['playtime_string']
			);
    	}

//     	App_Headers::textPlain();
//     	var_dump($rows);

//        $id = new getID3();

//        $info = getid3_lib::CopyTagsToComments($ThisFileInfo);
//        var_dump($tags['playtime_string']);
//     	$this->insertOrUpdate($rows);
    	die();
    }
    
}