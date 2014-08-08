
LessonCtrl = {
	playerWidget:{
		is_open:false
	},
	
	onChangeSelect: (function(){
		var target_id,
			$target,
			$filters,
			index,i,
			filters_length,
			getTargetIndex,
			getTargetIndex,
			targetIndex;
		
		$(document).ready(function(){
			$filters = $("select.filter");
			filters_length = $filters.length;
		});
		

		getTargetIndex = function(){
			
			i=0;
			for(; i<filters_length; i++){
				if($($filters[i]).attr('id') == target_id){
					return i;
				}
			}
			return null;
		};
		
		getFilterName = function(){
			var $filter;
			
			$filter = $filters[targetIndex++];
			
			if($filter){
				return $filters[targetIndex++].id;
			}
			
			return null;
		};
		
		loadFile = function(){
			if(!$("#filter option[value='0']:selected").length){
				var $form,
					$source_form,
					clone_selects,
					clone_option,
					option,
					form_selects;
				
				$source_form=$("#filter");
				$form = $("#filter").clone();
				clone_selects = $form.find('select');
				form_selects = $("#filter").find('select');
				
				for(i=0;i<clone_selects.length;i++){
					select_id = $(form_selects[i]).attr('id');
					option=$(form_selects[i]).find(':selected');
					clone_option = option.clone();
					clone_option.attr('selected','selected');
					$form.find('#'+select_id).append(clone_option);
				}
				$form.attr('id','get_lesson');
				$form.attr('action','index/lessons/loadFile?gt_test');
				$form.on('submit',function(e){
					myValidator._validateOnFormSubmit.call(myValidator,e);
					return false;
				});
				$form.submit();
			}
		};
		
		return function(e){
			
			if(arguments[1] < filters_length){
				return false;
			}

			$target = $(e.target);
			target_id = $target.attr("id");
			
			if(target_id == 'number'){
				
				if($("#filter_name").val() == 'location_id'){
					$("#filter_name").val('number');
				}
				
				loadFile();
				return true;
			}
			
			targetIndex = getTargetIndex();
			index = targetIndex+1;
			filterName = getFilterName();
			doSubmit = ( $target.val() != 0 );
			
			for(; index < filters_length; index++ ){
				$($filters[index]).find('option').not("[value='0']").remove();
				$($filters[index]).attr('disabled', 'disabled').addClass('disable');
				$($filters[index]).trigger("change",index);
			}
			
			$("#filter_name").val( filterName );

			if(doSubmit && $('#filter option:selected').not("[value='0']").length){
				$('#filter').submit();
			}	
			
		};
	})(),
	
	getFilterHeight: (function(){
		
		var $filter;
		
		$(document).ready(function(){
			$filter = $('#filter');
		});
		
		return function(){
			return $filter.outerHeight();
		};
	})()
};

function filterOnSuccess(response){}