
formsCallbackMap = {
	/**
	 * manager for form FILTER id
	 */
	filter:{
		onSuccess:function(response){
			if(!response['filter_name']){
				return;
			}
            if(response.token){
                TaskHelper.token = response.token;
            }
			options = {};
			objects = response.objects;
			filter_name = response.filter_name;
			if(filter_name !="number"){
				filter="text";
			}else{
				filter="number";
			}
			for(i in objects){
				options[objects[i][filter_name]] = objects[i][filter];
			}
			$.each(options, function(val, text) {
			    $('#'+filter_name).append( new Option(text,val) );
			});
			$('#'+filter_name).prop('disabled', false).removeClass('disable');
		},
		onError:function(response){
			console.log(this,'error');
		}
	},
	
	/**
	 * manager for form GET_LESSON id
	 */
	get_lesson:{
		onSuccess:function(response){
			if(response.lesson.src){
				playerStateController.stop();
				playerStateView._loadFile = false;
				GT.media.audio5js.load(response.lesson.src);
				$('#details').html(response.lesson.lecturer+' - '+response.lesson.location+'<br/>'+response.lesson.series+' - '+response.lesson.year+' - מספר '+response.lesson.number);
				$('#time-duration').text(response.lesson.duration);
                if(response.token){
                    TaskHelper.token = response.token ;
                }
				$('#lesson-download-btn').attr('href','index/lessons/download/?id='+response.lesson.id+'&token='+TaskHelper.token);
			}
			if(!LessonCtrl.playerWidget.is_open){
//				padding = parseInt($('#wrap-download-select').css('padding').split(' ')[0].replace(/[a-z]+/,""));
				filterHeight = parseInt($('#filter').css('height').replace(/[a-z]+/,"")); //$('#filter').outerHeight()
				height = filterHeight + $('#lesson-options').outerHeight();
				$('#wrap-download-select').removeClass('hide-player').css('height',height);
				setTimeout(function(){
					$('#wrap-download-select').css('height','auto');
				},500);
				
				LessonCtrl.playerWidget.is_open = true;
			}
			
		},
		onError:function(response){
			console.log(this,'error');
		}
	},
	
	/**
	 * manager for form DOWNLOAD_FILE id
	 */	
	download_file:{
		onSuccess:function(response){},
		onError:function(response){console.log(this,'error');},
	},
	
	contact_us:{
		onSuccess:function(response){},
		onError:function(response){console.log(this,'error');},
	}
	

};
