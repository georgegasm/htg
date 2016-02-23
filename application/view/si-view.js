$(document).ready(function(){
	if(!isLocked("page-wrapper","page-header",lockprofessorsincentiveslist)){
		initChosenDDL();
		initSpreadSheetSI();
		initSpreadSheetP();
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
	    $("#generateAll").click(function(){
	    	generatePDF(2);
	    });
	    $("#generateSingle").click(function(){
	    	if($("#generateprofessordll").val() == "All")
	    		generatePDF(2);
	    	else
	    		generatePDF(1);
	    })
	}
});