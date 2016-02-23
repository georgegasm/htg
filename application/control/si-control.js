function initSpreadSheetP(){
	var showstr = ($('#showddlprof').val() == "All"?"":"AND F = '" +$('#showddlprof').val() +"'");
	var departmentstr = ($('#departmentddlprof').val() == "All"?"":" AND B = '" +$('#departmentddlprof').val() +"'");
	var namestr = ($('#nameddlprof').val() == "All"?"":" AND A = '" + $('#nameddlprof').val() + "'");
	var querystr = "SELECT * WHERE 1=1 " +showstr +departmentstr /*+subjectstr +sectionstr*/ +namestr;
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
	$("#showddlprof, #departmentddlprof, #subjectddlprof, #sectionddlprof, " +
		"#nameddlprof, #showddl, #showdateddl, #professorddl, #subjectddl, " +
		"#sectionddl, #searchddl, #typeddlprof").chosen({width: "100%"});
	$('#generateprofessordll').chosen({width: "69%"});
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
			var flag = false;
			for(var x=0;x < incentivearr.length; x++){
				if(typeof incentivearr[x].split("-")[1] !== 'undefined'){
					var i = new Incentive(td[0].innerText,incentivearr[x].split("-")[0].trim(),incentivearr[x].split("-")[1].trim());
					incentives.push(i);
				}
			}
			if($('#subjectddl').val() == "All" && $('#sectionddl').val() == "All"){
				flag = true;
			}
			else if(td[13].innerText.indexOf($('#subjectddl').val()) > -1 && td[13].innerText.indexOf($('#sectionddl').val()) > -1 ){
				flag = true;
			}
			else if($('#subjectddl').val() != "All" && $('#sectionddl').val() == "All"){
				if(td[13].innerText.indexOf($('#subjectddl').val()) > -1)
					flag = true;
			}
			else if($('#subjectddl').val() == "All" && $('#sectionddl').val() != "All"){
				if(td[13].innerText.indexOf($('#sectionddl').val()) > -1)
					flag = true;
			}
			if(flag){
				var student = new Student(td[0].innerText,td[1].innerText,td[2].innerText.trim(),td[3].innerText,td[4].innerText,
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
	makeTableSortable('sitbl');
}

function assignTableDataP(){
	professorList = [];
	var show = $('#srp > thead > tr > th')[5].innerText;
	$('#srp > tbody > tr').each(function(){
		var td = $(this).find('td');
		var incentivearr = td[2].innerText.split(", ");
		var incentives = [];
		var flag = false;
		for(var x=0;x < incentivearr.length; x++){
			var i = new Incentive(show,incentivearr[x].split("-")[0].trim(),incentivearr[x].split("-")[1].trim(),incentivearr[x].split("-")[2].trim());
			incentives.push(i);
		}
		var subject = $('#subjectddlprof').val();
		var section = $('#sectionddlprof').val();
		var type = $('#typeddlprof').val();
		if(subject == "All" && $('#sectionddlprof').val() == "All"){
			flag = true;
		}else if(td[2].innerText.indexOf(subject) > -1 && td[2].innerText.indexOf(section) > -1 ){
			flag = true;
		}else if(subject != "All" && section == "All"){
			if(td[2].innerText.indexOf(subject) > -1)
				flag = true;
		}else if(subject == "All" && section != "All"){
			if(td[2].innerText.indexOf(section) > -1)
				flag = true;
		}
		if(type != "All"){
			if(td[2].innerText.indexOf(type) == -1)
				flag = false;
		}
		if(flag){
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
	makeTableSortable('pitable');
}

function checkStatus(error){
	if(error != null && error == "Error: Request failed."){
		sweetAlert("Oops...", "Something went wrong with the Google Spreadsheet." , "error");
		console.log(error);
		return false;  		
	}
	return true;
}

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

function generatePDF(type){
	var print_professorList = [];
	if(type == 1){
		for(var x = 0; x < professorList.length; x++){
			if(professorList[x].name == $("#generateprofessordll").val()){
				print_professorList.push(professorList[x]);
				break;
			}
		}
	}else{
		print_professorList = professorList;
	}

    var doc = new jsPDF();
    doc.setFontSize(font_size);
    var yaxis = starting_yaxis;
    for(var w = 0; w < print_professorList.length; w++){
    	var prof = print_professorList[w];
    	//HEADERS
    	doc.text(starting_xaxis, starting_yaxis, dd +" " +months[mm] +" " +yyyy);
    	yaxis += long_line_space;
	    doc.text(starting_xaxis, yaxis,"Professor: " + prof.name);
	    yaxis += short_line_space;
	    doc.text(starting_xaxis, yaxis,"Re: Attendance List for Incentives");
	    yaxis += short_line_space;
	    doc.text(starting_xaxis, yaxis,"Event: " +prof.show);

	    for(var x = 0; x < prof.incentive.length; x++){
	    	var counter = 0;
	    	var attendeesFlag = false;
	    	var incentive = prof.incentive[x];
	    	if(nextPageChecker(yaxis)){
	    		doc.addPage();
	    		yaxis = starting_yaxis;
	    	}else
	    		yaxis += long_line_space;

	    	doc.text(starting_xaxis, yaxis, incentive.subject +" - " +incentive.section + " (" +incentiveType(incentive.type) +")");

			for(var y = 0; y < studentList.length; y ++){
				if(studentList[y].attendance == "NO")
					break;

				var student = studentList[y];
				for(var z = 0; z < student.incentive.length; z++){
					var sincentive = student.incentive[z];
					if(sincentive.subject == incentive.subject && sincentive.section == incentive.section){
						if(nextPageChecker(yaxis)){
				    		doc.addPage();
				    		yaxis = starting_yaxis;
				    	}else
							yaxis += short_line_space;
						counter++;
						doc.text(starting_xaxis + indent_xaxis, yaxis, counter +".) "+student.idNumber +" - " +student.name);
						attendeesFlag = true;
					}
				}
			}
			if(!attendeesFlag){
				if(nextPageChecker(yaxis)){
		    		doc.addPage();
		    		yaxis = starting_yaxis;
		    	}else
					yaxis += short_line_space;
				doc.text(starting_xaxis + indent_xaxis, yaxis, "(No attendees for this subject and section)");
			}
	    }
	    if(nextPageChecker(yaxis)){
    		doc.addPage();
    		yaxis = starting_yaxis;
    	}else
			yaxis += long_line_space;

		doc.text(starting_xaxis, yaxis, footer_text);
	    
	    if(print_professorList.length > 1){
    	    yaxis = starting_yaxis;
    	    doc.addPage();
	    }
    }
    if(print_professorList.length > 1){
    	doc.save('Professors Incentives.pdf');
    }else if(print_professorList.length == 1){
    	doc.save(print_professorList[0].name +'.pdf');
    }else{
    	sweetAlert("Oops...", "There are no professors found." , "info");
    }
}

function nextPageChecker(yaxis){
    return yaxis >= maximum_page_yaxis?true:false;
}
function incentiveType(incentiveCode){
	switch(incentiveCode){
		case 'i1': return 'Required'; break;
		case 'i2': return 'Alternative Class'; break;
		case 'i3': return 'Incentive'; break;
		case 'i4': return 'Art in Action'; break;
	}
}