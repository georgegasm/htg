studentList = [];
professorList = [];
incentiveList = [];
var Class = function(methods) {   
    var c = function() {    
        this.initialize.apply(this, arguments);          
    };  
    
    for (var property in methods) { 
       c.prototype[property] = methods[property];
    }
          
    if (!c.prototype.initialize) c.prototype.initialize = function(){};      
    
    return c;    
};

var Student = Class({
	initialize: function(show, showDate, dateBought, ticketNumber, priceType, name, idNumber, degreeCode, contactNumber, soldBy, ticketType, bulkNumber, attendance, incentive){
		this.show = show,
		this.showDate = showDate,
		this.dateBought = dateBought,
		this.ticketNumber = ticketNumber,
		this.priceType = priceType,
		this.name = name,
		this.idNumber = idNumber,
		this.degreeCode = degreeCode,
		this.contactNumber = contactNumber,
		this.soldBy = soldBy,
		this.ticketType = ticketType,
		this.bulkNumber = bulkNumber,
		this.attendance = attendance,
		this.incentive = incentive
	}
});

var Professor = Class({
	initialize: function(show, name, department, incentive){
		this.show = show,
		this.name = name,
		this.department = department,
		this.incentive = incentive
	}
});

var Incentive = Class({
	initialize: function(show, subject, section){
		this.show = show,
		this.subject = subject,
		this.section = section
	}
});