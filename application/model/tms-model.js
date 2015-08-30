studentList = [];
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
	initialize: function(show, showDate, dateBought, ticketNumber, priceType, name, idNumber, degreeCode, contactNumber, soldBy, ptBy, bulk, attendance, incentive){
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
		this.ptBy = ptBy,
		this.bulk = bulk,
		this.attendance = attendance,
		this.incentive = incentive
	}
});