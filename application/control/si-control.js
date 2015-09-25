function initSpreadSheetP(){
	var showstr = ($('#showddlprof').val() == "All"?"":"AND F = '" +$('#showddlprof').val() +"'");
	var departmentstr = ($('#departmentddlprof').val() == "All"?"":" AND B = '" +$('#departmentddlprof').val() +"'");
	var subjectstr = ($('#subjectddlprof').val() == "All"?"":" AND C = '" +$('#subjectddlprof').val() +"'");
	var sectionstr = ($('#sectionddlprof').val() == "All"?"":" AND C = '" +$('#sectionddlprof').val() +"'");
	var namestr = ($('#nameddlprof').val() == "All"?"":" AND A = '" + $('#nameddlprof').val() + "'");
	var querystr = "SELECT * WHERE 1=1 " +showstr +departmentstr +subjectstr +sectionstr +namestr;
	//fix bug happening when selecting filter and then submitting.
	//check the displayed srp table on the screen.
	loadingSearchButton(true,"searchButton2");
	$('#srp').empty();
	$('#srp').sheetrock({
	  url: professorsincentiveslist,
	  query: querystr,
	  reset: true,
	  callback: function(error){
	  	if(checkStatus(error)){
		  	assignTableDataP();
		  	fillFiltersP();	
	  	}
	  	loadingSearchButton(false,"searchButton2");
	  }
	});
}

function initSpreadSheetSI(){
	var showstr = ($('#showddl').val() == "All"?"":"AND A = '" +$('#showddl').val() +"'");
	var showdatestr = ($('#showdateddl').val() == "All"?"":" AND B = '" +$('#showdateddl').val() +"'");
	var professorstr = ($('#professorddl').val() == "All"?"":" AND J = '" +$('#professorddl').val() +"'");
	var subjectstr = ($('#subjectddl').val() == "All"?"":" AND K = '" +$('#subjectddl').val() +"'");
	var sectionstr = ($('#sectionddl').val() == "All"?"":" AND E = '" +$('#sectionddl').val() +"'");
	var searchstr = ($('#searchddl').val() == "All"?"":" AND F = '" + $('#searchddl').val().split(" - ")[0] + "'");
	var attendedstr = ($('#attendedCheck').is(':checked')?" AND M = 'YES'":" AND M = 'NO'");
	var querystr = "SELECT * WHERE 1=1 " +showstr +showdatestr +professorstr +subjectstr +sectionstr +searchstr +attendedstr;
	loadingSearchButton(true,"searchButton");
	$('#srsi').empty();
	$('#srsi').sheetrock({
	  url: incentivesmasterlist,
	  query: querystr,
	  reset: true,
	  callback: function(error){
	  	if(checkStatus(error)){
		  	assignTableDataSI();
		  	fillFiltersSI();	
	  	}
	  	loadingSearchButton(false,"searchButton");
	  }
	});
}

function initChosenDDL(){
	$('#showddlprof').chosen({width: "100%"});
	$('#departmentddlprof').chosen({width: "100%"});
	$('#subjectddlprof').chosen({width: "100%"});
	$('#sectionddlprof').chosen({width: "100%"});
	$('#nameddlprof').chosen({width: "100%"});
	$('#showddl').chosen({width: "100%"});
	$('#showdateddl').chosen({width: "100%"});
	$('#professorddl').chosen({width: "100%"});
	$('#subjectddl').chosen({width: "100%"});
	$('#sectionddl').chosen({width: "100%"});
	$('#searchddl').chosen({width: "100%"});
}

function assignTableDataSI(){
	//to access table headers, use tablename > thead > tr > th
	//to access table datas, use tablename > tbody > tr > td
	studentList = [];
	$('#srsi > tbody > tr').each(function(){
		var td = $(this).find('td');
		//make data dependent on the Date Bought column.
		//include only those who have Date Bought.
		if(td[2].innerText.length > 0){
			
			var boughtformat = td[2].innerText.replace(/,/gi,'/').substr(5,10);
			boughtformat = boughtformat.replace(')','');
			var d = new Date(boughtformat);
			d.setMonth(d.getMonth() + 1);
			//transfer date checker here because it can't search through the query.
			boughtformat = (d.getMonth() +1) +'/' +d.getDate() +'/' +d.getFullYear();
			var student = new Student(td[0].innerText,td[1].innerText,boughtformat,td[3].innerText,td[4].innerText,
				td[5].innerText,td[6].innerText,td[7].innerText,td[8].innerText,td[9].innerText,td[10].innerText,
				td[11].innerText,td[12].innerText,td[13].innerText);
			studentList.push(student);
		}
	});
	$('#srsi > tbody').empty();
	$('#sitbl > tbody').empty();

	var tbl = $('#sitbl > tbody')[0];
	var x = 0;
	var row,cell,text;
	for(x; x < studentList.length; x++){
		newRow   = tbl.insertRow(tbl.rows.length);
		cell  = newRow.insertCell(0);
		text  = document.createTextNode(studentList[x].ticketNumber); cell.appendChild(text);
		cell  = newRow.insertCell(1);
		text  = document.createTextNode(studentList[x].name); cell.appendChild(text);
		cell  = newRow.insertCell(2);
		text  = document.createTextNode(studentList[x].idNumber); cell.appendChild(text);
		cell  = newRow.insertCell(3);
		text  = document.createTextNode(studentList[x].degreeCode); cell.appendChild(text);
		cell  = newRow.insertCell(4);
		text  = document.createTextNode(studentList[x].contactNumber); cell.appendChild(text);
		cell  = newRow.insertCell(5);
		text  = document.createTextNode(studentList[x].attendance); cell.appendChild(text);
		cell  = newRow.insertCell(6);
		text  = document.createTextNode(studentList[x].incentive); cell.appendChild(text);
	}
}

function assignTableDataP(){
	professorList = [];
	var show = $('#srp > thead > tr > th')[5].innerText;
	$('#srp > tbody > tr').each(function(){
		var td = $(this).find('td');
		var professor = new Professor(show,td[0].innerText,td[1].innerText,td[2].innerText);
		professorList.push(professor);
	});

	$('#srp > tbody').empty();
	$('#pitable > tbody').empty();

	var tbl = $('#pitable > tbody')[0];
	var x = 0;
	var row,cell,text;
	for(x; x < professorList.length; x++){
		newRow   = tbl.insertRow(tbl.rows.length);
		cell  = newRow.insertCell(0);
		text  = document.createTextNode(professorList[x].name); cell.appendChild(text);
		cell  = newRow.insertCell(1);
		text  = document.createTextNode(professorList[x].department); cell.appendChild(text);
		cell  = newRow.insertCell(2);
		text  = document.createTextNode(professorList[x].incentive); cell.appendChild(text);
	}
}

function checkStatus(error){
	if(error != null && error == "Error: Request failed."){
		sweetAlert("Oops...", "Something went wrong with the Google Spreadsheet." , "error");
		console.log(error);
		return false;  		
	}
	return true;
}
//change names here
function fillFiltersSI(){
	var x = 0;
	var showArr = [], showdateArr = [], professorArr = [], subjectArr = [], sectionArr = [], nameidArr = [];
	for(x; x < studentList.length; x++){
		if($.inArray(studentList[x].show, showArr) == -1) showArr.push(studentList[x].show);
		if($.inArray(studentList[x].showDate, showdateArr) == -1) showdateArr.push(studentList[x].showDate);
		//if($.inArray(studentList[x].soldBy, professorArr) == -1) professorArr.push(studentList[x].soldBy);
		//if($.inArray(studentList[x].ticketType, subjectArr) == -1) subjectArr.push(studentList[x].ticketType);
		//if($.inArray(studentList[x].priceType, sectionArr) == -1) sectionArr.push(studentList[x].priceType);
		if($.inArray(studentList[x].name + " - " +studentList[x].idNumber, nameidArr) == -1) nameidArr.push(studentList[x].name + " - " +studentList[x].idNumber);
	}
	var option = '';

	for (var i=0;i<showArr.length;i++){
	   option += '<option value="'+ showArr[i] + '">' + showArr[i] + '</option>';
	}
	$('#showddl').find('option').remove().end().append('<option value="All">All</option>').val('All');
	$('#showddl').append(option);$("#showddl").trigger("chosen:updated"); option = '';

	for (var i=0;i<showdateArr.length;i++){
	   option += '<option value="'+ showdateArr[i] + '">' + showdateArr[i] + '</option>';
	}
	$('#showdateddl').find('option').remove().end().append('<option value="All">All</option>').val('All');
	$('#showdateddl').append(option);$("#showdateddl").trigger("chosen:updated");option = '';

	for (var i=0;i<nameidArr.length;i++){
	   option += '<option value="'+ nameidArr[i] + '">' + nameidArr[i] + '</option>';
	}
	$('#searchddl').find('option').remove().end().append('<option value="All">All</option>').val('All');
	$('#searchddl').append(option);$("#searchddl").trigger("chosen:updated");option = '';
}

function fillFiltersP(){
	var x = 0;
	var showArr = [], departmentArr = [], subjectArr = [], sectionArr = [], nameArr = [];
	for(x; x < professorList.length; x++){
		if($.inArray(professorList[x].show, showArr) == -1) showArr.push(professorList[x].show);
		if($.inArray(professorList[x].department, departmentArr) == -1) departmentArr.push(professorList[x].department);
		//if($.inArray(professorList[x].show, subjectArr) == -1) subjectArr.push(studentList[x].show);
		//if($.inArray(professorList[x].show, sectionArr) == -1) sectionArr.push(studentList[x].show);
		if($.inArray(professorList[x].name, nameArr) == -1) nameArr.push(professorList[x].name);
	}
	var option = '';

	for (var i=0;i<showArr.length;i++){
	   option += '<option value="'+ showArr[i] + '">' + showArr[i] + '</option>';
	}
	$('#showddlprof').find('option').remove().end().append('<option value="All">All</option>').val('All');
	$('#showddlprof').append(option);$("#showddlprof").trigger("chosen:updated"); option = '';

	for (var i=0;i<departmentArr.length;i++){
	   option += '<option value="'+ departmentArr[i] + '">' + departmentArr[i] + '</option>';
	}
	$('#departmentddlprof').find('option').remove().end().append('<option value="All">All</option>').val('All');
	$('#departmentddlprof').append(option);$("#departmentddlprof").trigger("chosen:updated"); option = '';

	for (var i=0;i<nameArr.length;i++){
	   option += '<option value="'+ nameArr[i] + '">' + nameArr[i] + '</option>';
	}
	$('#nameddlprof').find('option').remove().end().append('<option value="All">All</option>').val('All');
	$('#nameddlprof').append(option);$("#nameddlprof").trigger("chosen:updated"); option = '';
}


function loadingSearchButton(bool,source){
	if(bool){
		$('#' +source).html('<span class="glyphicon glyphicon-refresh glyphicon-refresh-animate"></span>');
		$('#' +source).prop('disabled', true);
	}else{
		$('#' +source).text('Search');
		$('#' +source).prop('disabled', false);
	}
}

function isLocked(divID, exceptionDivID,showValue){
	if(showValue == 0){
		$('#'+divID).html($('#'+divID).find('#'+exceptionDivID));
		$('#'+divID).append("<div class='row'><div class='col-lg-12'><h1><i class='fa fa-lock'></i>The Spreadsheet used for this page is locked. Please contact the Division Manager for "
			+$('#activeDivision').text() +" for more information regarding this matter.</h1></div></div>");
		return true;
	}
	return false;
}

//DEV FUNCTIONS
function getProperties(prop){
	var arr = [];
	for(var name in prop){
		arr.push(name);
	}
	console.log(arr);
}