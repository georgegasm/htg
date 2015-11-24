function initSpreadSheet(){
	loadingSearchButton(true,"soldcount");
	$('#srtms').empty();
	$('#srtms').sheetrock({
	  url: ticketmonitoringsheet,
	  reset: true,
	  callback: function(error){
	  	if(checkStatus(error)){
		  	assignTableData();
	  	}
	  }
	});
}

function assignTableData(error){
	//to access table headers, use tablename > thead > tr > th
	//to access table datas, use tablename > tbody > tr > td
	studentList = [];
	var count = 0;
	$('#srtms > tbody > tr').each(function(){
		var td = $(this).find('td');
		//make data dependent on the Date Bought column.
		//include only those who have Date Bought.
		if(td[2].innerText.length > 0){
			
			var boughtformat = td[2].innerText.replace(/,/gi,'/').substr(5,10);
			boughtformat = boughtformat.replace(')','');
			var d = new Date(boughtformat);
			d.setMonth(d.getMonth() + 1);
			boughtformat = (d.getMonth() +1) +'/' +d.getDate() +'/' +d.getFullYear();
			var student = new Student(td[0].innerText,td[1].innerText,boughtformat,td[3].innerText,td[4].innerText,
				td[5].innerText,td[6].innerText,td[7].innerText,td[8].innerText,td[9].innerText,td[10].innerText,
				td[11].innerText,td[12].innerText,td[13].innerText);
			studentList.push(student);
			count++;

		}
	});
	loadingSearchButton(false,"soldcount",count);

	$('#srtms > tbody').empty();
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