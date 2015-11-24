function initSpreadSheetP(){
	loadingSearchButton(true,"incentivecount");
	$('#srp').empty();
	$('#srp').sheetrock({
	  url: professorsincentiveslist,
	  reset: true,
	  callback: function(error){
	  	if(checkStatus(error)){
		  	assignTableDataP();
	  	}
	  }
	});
}

function assignTableDataP(){
	professorList = [];
	var show = $('#srp > thead > tr > th')[5].innerText;
	var count = 0;
	$('#srp > tbody > tr').each(function(){
		var td = $(this).find('td');
		var incentivearr = td[2].innerText.split(", ");
		var incentives = [];
		for(var x=0;x < incentivearr.length; x++){
			var i = new Incentive(show,incentivearr[x].split("-")[0],incentivearr[x].split("-")[1]);
			incentives.push(i);
			count++;
		}
	});
	loadingSearchButton(false,"incentivecount",count);

	$('#srp > tbody').empty();
}

function checkStatus(error){
	if(error != null && error == "Error: Request failed."){
		sweetAlert("Oops...", "Something went wrong with the Google Spreadsheet." , "error");
		console.log(error);
		return false;  		
	}
	return true;
}

function loadingSearchButton(bool,source,text){
	if(bool){
		$('#' +source).html('<span class="glyphicon glyphicon-refresh glyphicon-refresh-animate"></span>');
	}else{
		$('#' +source).text(text);
	}
}