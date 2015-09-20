$(document).ready(function(){
	if(!isLocked("page-wrapper","page-header",lockprofessorsincentiveslist)){
		initChosenDDL();
		initSpreadSheetSI();
		$("#searchButton").click(function(){
	        initSpreadSheetSI();
	    }); 
	    $("#searchButton2").click(function(){
	    	initSpreadSheetP();
	    });
		$('#filterToggle, #professorToggle').click(function(){
	        $child=$(this).children('div').children('h4').children('i');
	        $child.toggleClass("fa-arrow-down").toggleClass("fa-arrow-up");
	    });
	}
});