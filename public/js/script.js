
$(document).ready(function(){
	var myValidator = new GT.StandardFormValidator();
		myValidator.bindForms();
		
	$("#add-filters-body .btn-success").on("click",prepareToAddFilter);	
	
	if(typeof $.fn.colorbox !="undefined"){
		$('a.youtube').colorbox({ 
			href:$(this).data("youtube-embed"), 
			innerWidth: '600px', 
			innerHeight: '400px', 
			iframe: true,
			title:"סירטון שיעור",
			cbox_open:function(){  
				setTimeout(function(){
					$("#cboxTitle").html($(this).data("youtube-title"));
				},1000);
		    }
				});
	}

	if(typeof $.fn.chosen !="undefined"){
		$("select").chosen({
			width: "24%",
			inherit_select_classes:false,
			no_results_text:"לא נמצאו תוצאות עבור - "
		});
	}
	if(typeof $.fn.dataTable !="undefined"){
		var oTable1 = $('#sample-table-2').dataTable( {} );
//		$('table th input:checkbox').on('click' , function(){
//			var that = this;
//			$(this).closest('table').find('tr > td:first-child input:checkbox')
//			.each(function(){
//				this.checked = that.checked;
//				$(this).closest('tr').toggleClass('selected');
//			});
//				
//		});
	}
	
//	$("#lessons .btn-delete").on(ace.click_event, function() {
//		var confirm_question = "<div>" +
//				" אתה בטוח שאתה רוצה למחוק את השיעור<br/>" +
//				"<span class='delete-lessons-info'>"+$(this).data("lessons-info")+"</span> ?</div>";
//		bootbox.confirm(confirm_question, function(result) {
//			if(result) {
//			}
//			console.log(result);
//		});
//	});
	if(typeof ace !="undefined"){
		$("#lessons .btn-delete").on(ace.click_event, function() {
			var confirm_question = "<div class='confirn-delete-lessons'>" +
			" אתה בטוח שאתה רוצה למחוק את <br/>" +
			"<span class='delete-lessons-info'>"+$(this).data("lessons-info")+"  </span> ?</div>";	
			delete_lesson_id = $(this).data("lesson-id");
			bootbox.dialog({
				message: confirm_question,
				title: "מחיקת שיעור מהמערכת",
				buttons: 			
				{
					"success" :
					{
						"label" : "<i class='icon-ok'></i>  התחרטתי לא תודה !",
						"className" : "btn-sm btn-success",
						"callback": function(r) {
							//Example.show("great success");
						}
					},
					"danger" :
					{
						"label" : "<i class='icon-trash bigger-130'></i> אני בטוח רוצה למחוק !",
						"className" : "btn-sm btn-danger",
						"callback": function(e) {
							//console.log(e.target);
							deleteLesson();
						}
					}
				}
			});
		});
		
	}
	
	if(typeof $.fn.datepicker !="undefined"){
//		$('input.datepicker').datepicker({autoclose:true}).next().on(ace.click_event, function(){
//			$(this).prev().focus();
//		});
	}
});

function isNumber(event){
	  var charCode = (event.which) ? event.which : event.keyCode;
	  if (charCode > 31 && (charCode < 48 || charCode > 57))
	   return false;
	 return true;
	}

deleteLesson = function(){
	$("#deleteForm #lesson-id").val(delete_lesson_id);
	$("#deleteForm").submit();
};
delete_lesson_id = null;
//deleteFormOnSuccess = function (response){
//	if(response.success){
//		$("tr[data-id="+delete_lesson_id+"]").remove();
//	}
//};
//loginFormOnSuccess = function(response){
//	$(".error").removeClass("error");
//	if(typeof response.error !== "undefined"){
//		for(key in response.error){
//			$("#"+key).addClass("error");
//		}
//		if(response.error == "invalid username / password"){
//			$("#error-msg").text(response.error);
//		}
//		return;
//	}
//	window.location = window.location.href;
//};
	
//updateFormOnSuccess = function(response){
//	$(".error").removeClass("error");
//	if(typeof response.error !== "undefined"){
//		for(key in response.error){
//			$("#"+key).addClass("error");
//			$("#"+key+"+.chosen-container-single").addClass("error");
//		}
//	}
//};


function prepareToAddFilter(){
	var filter_val = $("#add-filters-body .active input").val(),
		filter_identifier = $("#add-filters-body .active input").data("identifier");
	
	$("#addFilterForm #filter_text").val(filter_val);
	$("#addFilterForm #filter_identifier").val(filter_identifier);
	$("#addFilterForm").submit();
}


addFilterFormOnSuccess = function(response){
	
};
addFilterFormOnError = function(response){
	
};