function initDateFilters(){
	jQuery('#fromDate, #toDate').datetimepicker({
	  timepicker:false,
	  format:'m/d/Y',
	  onChangeDateTime:function(dp,input){
	    
	  }
	});
	$("#toDateCheck").change(function () {
	  $(this).is(":checked") ? $("#toDate").val($("#fromDate").val()) : $("#toDate").val("");
	});
}

function initSpreadSheet(){
	var showstr = ($('#showddl').val() == "All"?"":"AND A = '" +$('#showddl').val() +"'");
	var showdatestr = ($('#showdateddl').val() == "All"?"":" AND B = '" +$('#showdateddl').val() +"'");
	var soldbystr = ($('#soldbyddl').val() == "All"?"":" AND J = '" +$('#soldbyddl').val() +"'");
	var ptbystr = ($('#ptbyddl').val() == "All"?"":" AND K = '" +$('#ptbyddl').val() +"'");
	var pricetypestr = ($('#pricetypeddl').val() == "All"?"":" AND E = '" +$('#pricetypeddl').val() +"'");
	var bulkstr = (!$('#isbulkCheck').is(":checked")?" AND L = 'NO'":" AND L = 'YES'");
	//var fromdatestr = ($('#fromDate').val() == ""?"":" AND B > " +$('#showdateddl').val());
	var querystr = "SELECT * WHERE 1=1 " +showstr +showdatestr +soldbystr +ptbystr +pricetypestr +bulkstr;
	loadingSearchButton(true);
	$('#srtms').empty();
	$('#srtms').sheetrock({
	  url: ticketmonitoringsheet,
	  query: querystr,
	  reset: true,
	  callback: function(error){
	  	if(checkStatus(error)){
		  	assignTableData();
		  	fillFilters();	
	  	}
	  	loadingSearchButton(false);
	  }
	});
}

function initChosenDDL(){
	$('#showddl').chosen({width: "100%"});
	$('#showdateddl').chosen({width: "100%"});
	$('#soldbyddl').chosen({width: "100%"});
	$('#ptbyddl').chosen({width: "100%"});
	$('#pricetypeddl').chosen({width: "100%"});
}

function assignTableData(error){
	//to access table headers, use tablename > thead > tr > th
	//to access table datas, use tablename > tbody > tr > td
	studentList = [];
	$('#srtms > tbody > tr').each(function(){
		var td = $(this).find('td');
		var boughtformat = td[2].innerText.replace(/,/gi,'/').substr(5,10);
		boughtformat = boughtformat.replace(')','');
		var d = new Date(boughtformat);
		d.setMonth(d.getMonth() + 1);
		//transfer date checker here because it can't search through the query.
		if(checkDateFilter(d)){
			boughtformat = (d.getMonth() +1) +'/' +d.getDate() +'/' +d.getFullYear();
			var student = new Student(td[0].innerText,td[1].innerText,boughtformat,td[3].innerText,td[4].innerText,
				td[5].innerText,td[6].innerText,td[7].innerText,td[8].innerText,td[9].innerText,td[10].innerText,
				td[11].innerText,td[12].innerText,td[13].innerText);
			studentList.push(student);
		}
	});

	$('#srtms > tbody').empty();
	$('#tmstbl > tbody').empty();

	var tbl = $('#tmstbl > tbody')[0];
	var x = 0;
	var row,cell,text;
	for(x; x < studentList.length; x++){
		newRow   = tbl.insertRow(tbl.rows.length);
		cell  = newRow.insertCell(0);
		text  = document.createTextNode(studentList[x].ticketNumber); cell.appendChild(text);
		cell  = newRow.insertCell(1);
		text  = document.createTextNode(studentList[x].dateBought); cell.appendChild(text);
		cell  = newRow.insertCell(2);
		text  = document.createTextNode(studentList[x].name); cell.appendChild(text);
		cell  = newRow.insertCell(3);
		text  = document.createTextNode(studentList[x].priceType); cell.appendChild(text);
		cell  = newRow.insertCell(4);
		text  = document.createTextNode(studentList[x].idNumber); cell.appendChild(text);
		cell  = newRow.insertCell(5);
		text  = document.createTextNode(studentList[x].degreeCode); cell.appendChild(text);
		cell  = newRow.insertCell(6);
		text  = document.createTextNode(studentList[x].contactNumber); cell.appendChild(text);
		cell  = newRow.insertCell(7);
		text  = document.createTextNode(studentList[x].soldBy); cell.appendChild(text);
		cell  = newRow.insertCell(8);
		text  = document.createTextNode(studentList[x].ptBy); cell.appendChild(text);
		cell  = newRow.insertCell(9);
		text  = document.createTextNode(studentList[x].bulk); cell.appendChild(text);
	}
}

function checkStatus(error){
	if(error != null){
		sweetAlert("Oops...", "Something went wrong with the Google Spreadsheet." , "error");
		console.log(error);
		return false;  		
	}
	return true;
}

function checkDateFilter(date){
	var from,to;
	if($('#fromDate').val() == "" && $('#toDate').val() == ""){
		//both are empty
		return true;
	}else if($('#fromDate').val() != "" && $('#toDate').val() == ""){
		//from is not empty
		from = new Date($('#fromDate').val());
		if(date < from) return false;
	}else if($('#fromDate').val() == "" && $('#toDate').val() != ""){
		//to is not empty
		to = new Date($('#toDate').val());
		if(date > to) return false;
	}else{
		//both are not empty
		from = new Date($('#fromDate').val());
		to = new Date($('#toDate').val());
		if(date < from || date > to)return false;
	}
	return true;
}

function fillFilters(){
	var x = 0;
	var showArr = [], showdateArr = [], soldbyArr = [], ptbyArr = [], pricetypeArr = [];
	for(x; x < studentList.length; x++){
		if($.inArray(studentList[x].show, showArr) == -1) showArr.push(studentList[x].show);
		if($.inArray(studentList[x].showDate, showdateArr) == -1) showdateArr.push(studentList[x].showDate);
		if($.inArray(studentList[x].soldBy, soldbyArr) == -1) soldbyArr.push(studentList[x].soldBy);
		if($.inArray(studentList[x].ptBy, ptbyArr) == -1) ptbyArr.push(studentList[x].ptBy);
		if($.inArray(studentList[x].priceType, pricetypeArr) == -1) pricetypeArr.push(studentList[x].priceType);
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
	
	for (var i=0;i<soldbyArr.length;i++){
	   option += '<option value="'+ soldbyArr[i] + '">' + soldbyArr[i] + '</option>';
	}
	$('#soldbyddl').find('option').remove().end().append('<option value="All">All</option>').val('All');
	$('#soldbyddl').append(option);$("#soldbyddl").trigger("chosen:updated");option = '';
	
	for (var i=0;i<ptbyArr.length;i++){
	   option += '<option value="'+ ptbyArr[i] + '">' + ptbyArr[i] + '</option>';
	}
	$('#ptbyddl').find('option').remove().end().append('<option value="All">All</option>').val('All');
	$('#ptbyddl').append(option);$("#ptbyddl").trigger("chosen:updated");option = '';
	
	for (var i=0;i<pricetypeArr.length;i++){
	   option += '<option value="'+ pricetypeArr[i] + '">' + pricetypeArr[i] + '</option>';
	}
	$('#pricetypeddl').find('option').remove().end().append('<option value="All">All</option>').val('All');
	$('#pricetypeddl').append(option);$("#pricetypeddl").trigger("chosen:updated");option = '';
}

function loadingSearchButton(bool){
	if(bool){
		$('#searchButton').html('<span class="glyphicon glyphicon-refresh glyphicon-refresh-animate"></span>');
		$('#searchButton').prop('disabled', true);
	}else{
		$('#searchButton').text('Search');
		$('#searchButton').prop('disabled', false);
	}
}


//DEV FUNCTIONS
function getProperties(prop){
	var arr = [];
	for(var name in prop){
		arr.push(name);
	}
	console.log(arr);
}