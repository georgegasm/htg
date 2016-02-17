var showDates = [];
var boughtDates = [];
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
		if(td[2].innerHTML.length > 0){
			var student = new Student(td[0].innerHTML,td[1].innerHTML,td[2].innerHTML.trim(),td[3].innerHTML,td[4].innerHTML,
				td[5].innerHTML,td[6].innerHTML,td[7].innerHTML,td[8].innerHTML,td[9].innerHTML,td[10].innerHTML,
				td[11].innerHTML,td[12].innerHTML,td[13].innerHTML);
			studentList.push(student);
			count++;
			if($.inArray(td[2].innerHTML.trim(), boughtDates) == -1) boughtDates.push(td[2].innerHTML.trim());
		}
		if($.inArray(td[1].innerHTML, showDates) == -1) showDates.push(td[1].innerHTML);
	});
	loadingSearchButton(false,"soldcount",count);
	generatePanelsTicketSoldPerShow(showDates);
	generateTicketSalesReport(boughtDates);
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

function generatePanelsTicketSoldPerShow(showDates){
	var ticketsSold = [];
	for(var x = 0; x < showDates.length; x++){
		var count = 0;
		for(var y = 0; y < studentList.length; y++){
			if(studentList[y].showDate == showDates[x]){
				count++;
			}
		}
		ticketsSold.push(count);
	}
	for(var x = 0; x < showDates.length; x++){
		var contents = '<div class="col-lg-3 col-md-6">'
                        +'<div class="panel panel-green">'
                            +'<div class="panel-heading">'
                                +'<div class="row">'
                                    +'<div class="col-xs-3">'
                                        +'<i class="fa fa-smile-o fa-5x"></i>'
                                    +'</div>'
                                    +'<div class="col-xs-9 text-right">'
                                        +'<div class="huge" id="soldcount'+x+'">'+ticketsSold[x]+'</div>'
                                        +'<div>'+showDates[x]+'</div>'
                                    +'</div>'
                                +'</div>'
                            +'</div>'
                            +'<a href="tms.html">'
                                +'<div class="panel-footer">'
                                    +'<span class="pull-left">View Details</span>'
                                    +'<span class="pull-right"><i class="fa fa-arrow-circle-right"></i></span>'
                                    +'<div class="clearfix"></div>'
                                +'</div>'
                            +'</a>'
                        +'</div>'
                    +'</div>';
        $("#ticketSoldPerShowDiv").append(contents);            
    }
}

function generateTicketSalesReport(boughtDates){
	var ticketsSold = [];
	for(var x = 0; x < boughtDates.length; x++){
		var count = 0;
		var sales = 0;
		for(var y = 0; y < studentList.length; y++){
			if(studentList[y].dateBought == boughtDates[x]){
				count++;
				sales += parseInt(studentList[y].priceType);
			}
		}
		ticketsSold.push([count,sales]);
	}
	$('#salestbl > tbody').empty();

	var tbl = $('#salestbl > tbody')[0];
	var x = 0;
	var row,cell,text;
	for(x; x < boughtDates.length; x++){
		newRow   = tbl.insertRow(tbl.rows.length);
		cell  = newRow.insertCell(0);
		text  = document.createTextNode(boughtDates[x]); cell.appendChild(text);
		cell  = newRow.insertCell(1);
		text  = document.createTextNode(ticketsSold[x][0]); cell.appendChild(text);
		cell  = newRow.insertCell(2);
		text  = document.createTextNode(ticketsSold[x][1]); cell.appendChild(text);
	}
	makeTableSortable('salestbl');
}