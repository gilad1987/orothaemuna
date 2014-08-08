
$(document).ready(function(){
	$("select").chosen({
		width: "24%",
		inherit_select_classes:false,
		no_results_text:"לא נמצאו תוצאות עבור - "
	});
	
	var oTable1 = $('#sample-table-2').dataTable( {
		"aoColumns": [
	      { "bSortable": false },
	      null, null,null, null, null,
		  { "bSortable": false }
		] } );
		
		
		$('table th input:checkbox').on('click' , function(){
			var that = this;
			$(this).closest('table').find('tr > td:first-child input:checkbox')
			.each(function(){
				this.checked = that.checked;
				$(this).closest('tr').toggleClass('selected');
			});
				
		});
		
		
});
