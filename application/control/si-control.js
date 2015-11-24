function initSpreadSheetP(){
	var showstr = ($('#showddlprof').val() == "All"?"":"AND F = '" +$('#showddlprof').val() +"'");
	var departmentstr = ($('#departmentddlprof').val() == "All"?"":" AND B = '" +$('#departmentddlprof').val() +"'");
	//var subjectstr = ($('#subjectddlprof').val() == "All"?"":" OR C LIKE '%" +$('#subjectddlprof').val() +"%'");
	//var sectionstr = ($('#sectionddlprof').val() == "All"?"":" OR C LIKE '%" +$('#sectionddlprof').val() +"%'");
	var namestr = ($('#nameddlprof').val() == "All"?"":" AND A = '" + $('#nameddlprof').val() + "'");
	var querystr = "SELECT * WHERE 1=1 " +showstr +departmentstr /*+subjectstr +sectionstr*/ +namestr;
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
	//var subjectstr = ($('#subjectddl').val() == "All"?"":" AND K = '" +$('#subjectddl').val() +"'");
	//var sectionstr = ($('#sectionddl').val() == "All"?"":" AND E = '" +$('#sectionddl').val() +"'");
	var searchstr = ($('#searchddl').val() == "All"?"":" AND F = '" + $('#searchddl').val().split(" - ")[0] + "'");
	var attendedstr = ($('#attendedCheck').is(':checked')?" AND M = 'YES'":" AND M = 'NO'");
	var querystr = "SELECT * WHERE 1=1 " +showstr +showdatestr +professorstr /*+subjectstr +sectionstr*/ +searchstr +attendedstr;
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
	$('#generateprofessordll').chosen({width: "60%"});
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
			var incentivearr = td[13].innerText.split(", ");
			var incentives = [];
			for(var x=0;x < incentivearr.length; x++){
				var i = new Incentive(td[0].innerText,incentivearr[x].split("-")[0],incentivearr[x].split("-")[1]);
				incentives.push(i);
			}
			var boughtformat = td[2].innerText.replace(/,/gi,'/').substr(5,10);
			boughtformat = boughtformat.replace(')','');
			var d = new Date(boughtformat);
			d.setMonth(d.getMonth() + 1);
			//transfer date checker here because it can't search through the query.
			boughtformat = (d.getMonth() +1) +'/' +d.getDate() +'/' +d.getFullYear();
			if($('#subjectddl').val() == "All" && $('#sectionddl').val() == "All"){
				var student = new Student(td[0].innerText,td[1].innerText,boughtformat,td[3].innerText,td[4].innerText,
					td[5].innerText,td[6].innerText,td[7].innerText,td[8].innerText,td[9].innerText,td[10].innerText,
					td[11].innerText,td[12].innerText,incentives);
				studentList.push(student);
			}
			else if(td[13].innerText.indexOf($('#subjectddl').val()) > -1 && td[13].innerText.indexOf($('#sectionddl').val()) > -1 ){
				var student = new Student(td[0].innerText,td[1].innerText,boughtformat,td[3].innerText,td[4].innerText,
					td[5].innerText,td[6].innerText,td[7].innerText,td[8].innerText,td[9].innerText,td[10].innerText,
					td[11].innerText,td[12].innerText,incentives);
				studentList.push(student);
			}
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
		var i = "";
		for(var y = 0; y < studentList[x].incentive.length; y++){
			i += studentList[x].incentive[y].subject +"-" +studentList[x].incentive[y].section +(y == studentList[x].incentive.length - 1?"":",");
		}
		text  = document.createTextNode(i); cell.appendChild(text);
	}
}

function assignTableDataP(){
	professorList = [];
	var show = $('#srp > thead > tr > th')[5].innerText;
	$('#srp > tbody > tr').each(function(){
		var td = $(this).find('td');
		var incentivearr = td[2].innerText.split(", ");
		var incentives = [];
		for(var x=0;x < incentivearr.length; x++){
			var i = new Incentive(show,incentivearr[x].split("-")[0],incentivearr[x].split("-")[1]);
			incentives.push(i);
		}
		if($('#subjectddlprof').val() == "All" && $('#sectionddlprof').val() == "All"){
			var professor = new Professor(show,td[0].innerText,td[1].innerText,incentives);
			professorList.push(professor);
		}else if(td[2].innerText.indexOf($('#subjectddlprof').val()) > -1 && td[2].innerText.indexOf($('#sectionddlprof').val()) > -1 ){
			var professor = new Professor(show,td[0].innerText,td[1].innerText,incentives);
			professorList.push(professor);
		}
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
		var i = "";
		for(var y = 0; y < professorList[x].incentive.length; y++){
			i += professorList[x].incentive[y].subject +"-" +professorList[x].incentive[y].section +(y == professorList[x].incentive.length - 1?"":",");
		}
		text  = document.createTextNode(i); cell.appendChild(text);
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
		for(var y = 0; y < studentList[x].incentive.length; y++){
			if($.inArray(studentList[x].incentive[y].subject, subjectArr) == -1)	subjectArr.push(studentList[x].incentive[y].subject);
			if($.inArray(studentList[x].incentive[y].section, sectionArr) == -1)	sectionArr.push(studentList[x].incentive[y].section);
		}
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

	for (var i=0;i<subjectArr.length;i++){
	   option += '<option value="'+ subjectArr[i] + '">' + subjectArr[i] + '</option>';
	}
	$('#subjectddl').find('option').remove().end().append('<option value="All">All</option>').val('All');
	$('#subjectddl').append(option);$("#subjectddl").trigger("chosen:updated"); option = '';

	for (var i=0;i<sectionArr.length;i++){
	   option += '<option value="'+ sectionArr[i] + '">' + sectionArr[i] + '</option>';
	}
	$('#sectionddl').find('option').remove().end().append('<option value="All">All</option>').val('All');
	$('#sectionddl').append(option);$("#sectionddl").trigger("chosen:updated"); option = '';
}

function fillFiltersP(){
	var x = 0;
	var showArr = [], departmentArr = [], subjectArr = [], sectionArr = [], nameArr = [];
	for(x; x < professorList.length; x++){
		if($.inArray(professorList[x].show, showArr) == -1) showArr.push(professorList[x].show);
		if($.inArray(professorList[x].department, departmentArr) == -1) departmentArr.push(professorList[x].department);
		for(var y = 0; y < professorList[x].incentive.length; y++){
			if($.inArray(professorList[x].incentive[y].subject, subjectArr) == -1)	subjectArr.push(professorList[x].incentive[y].subject);
			if($.inArray(professorList[x].incentive[y].section, sectionArr) == -1)	sectionArr.push(professorList[x].incentive[y].section);
		}
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
	$('#nameddlprof').append(option);$("#nameddlprof").trigger("chosen:updated"); 
	$('#generateprofessordll').find('option').remove().end().append('<option value="All">All</option>').val('All');
	$('#generateprofessordll').append(option);$("#generateprofessordll").trigger("chosen:updated"); option = '';

	for (var i=0;i<subjectArr.length;i++){
	   option += '<option value="'+ subjectArr[i] + '">' + subjectArr[i] + '</option>';
	}
	$('#subjectddlprof').find('option').remove().end().append('<option value="All">All</option>').val('All');
	$('#subjectddlprof').append(option);$("#subjectddlprof").trigger("chosen:updated"); option = '';

	for (var i=0;i<sectionArr.length;i++){
	   option += '<option value="'+ sectionArr[i] + '">' + sectionArr[i] + '</option>';
	}
	$('#sectionddlprof').find('option').remove().end().append('<option value="All">All</option>').val('All');
	$('#sectionddlprof').append(option);$("#sectionddlprof").trigger("chosen:updated"); option = '';
	
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

//Attendance Letter Generation
function generateAll(){
	for(var x = 0; x < professorList.length; x++){
		var professor = professorList[x];

	}
	createPDF();
}

function createPDF() {
	var pdf = new jsPDF('p', 'pt', 'letter');
	source = $('#content')[0];
	specialElementHandlers = {
        '#bypassme': function (element, renderer) {
            return true
        }
    };
    margins = {
        top: 80,
        bottom: 60,
        left: 40,
        width: 522
    };
    pdf.fromHTML(
	    source, // HTML string or DOM elem ref.
	    margins.left, // x coord
	    margins.top, { // y coord
	        'width': margins.width, // max width of content on PDF
	        'elementHandlers': specialElementHandlers
    },
    function (dispose) {
        // dispose: object with X, Y of the last line add to the PDF 
        //          this allow the insertion of new lines after html
        pdf.save('Test.pdf');
    }, margins);
}

//DEV FUNCTIONS
function getProperties(prop){
	var arr = [];
	for(var name in prop){
		arr.push(name);
	}
	console.log(arr);
}