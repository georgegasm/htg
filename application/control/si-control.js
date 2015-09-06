function isLocked(divID, exceptionDivID,showValue){
	if(showValue == 0){
		$('#'+divID).html($('#'+divID).find('#'+exceptionDivID));
		$('#'+divID).append("<div class='row'><div class='col-lg-12'><h1><i class='fa fa-lock'></i>The Spreadsheet used for this page is locked. Please contact the Division Manager for "
			+$('#activeDivision').text() +" for more information regarding this matter.</h1></div></div>");
		return true;
	}
	return false;
}