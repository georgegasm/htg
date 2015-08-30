$(document).ready(function(){
	initDateFilters();
	initChosenDDL();
	initSpreadSheet();
	$("#searchButton").click(function(){
        initSpreadSheet();
    }); 
});

