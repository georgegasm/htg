function initDateFilters(){
	jQuery('#fromDate, #toDate').datetimepicker({
	  timepicker:false,
	  format:'Y-m-d',
	  onChangeDateTime:function(dp,$input){
	    
	  }
	});
	$("#toDateCheck").change(function () {
	  $(this).is(":checked") ? $("#toDate").val($("#fromDate").val()) : $("#toDate").val("");
	});
}