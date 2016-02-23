/*
CONFIG.JS
Put the links of the Google Spreadsheets to their corresponding variables between the two double quotations "<link>"

Variables with names that starts with lock are conditions that gives additional layer of security to the data.
Giving it a value of 1 means you are allowing it to be shown on the pages the spreadsheet is being accessed to.
On the other hand, giving it a value of 0 or any other value will make it unaccessible.
*/

var ticketmonitoringsheet = "https://docs.google.com/spreadsheets/d/1wrfv8NY041PQlq84OT92psO0OC0yI1vOHatIplqZBH4/edit#gid=419113379";
var lockticketmonitoringsheet = 1;

var incentivesmasterlist = "https://docs.google.com/spreadsheets/d/1wrfv8NY041PQlq84OT92psO0OC0yI1vOHatIplqZBH4/edit#gid=419113379";
var lockincentivesmasterlist = 1;

var professorsincentiveslist = "https://docs.google.com/spreadsheets/d/1FckMvdB_uCUKbLuy0lnZWmnPbdRgqrrlfhIDjVT0kk0/edit#gid=0";
var lockprofessorsincentiveslist = 1;

/*PDF LETTERS*/
var starting_xaxis = 60;
var starting_yaxis = 20;
var maximum_page_yaxis = 275;
var font_size = 12;
var long_line_space = 12;
var short_line_space = 5;
var indent_xaxis = 10;

var today = new Date();
var dd = today.getDate();
var mm = today.getMonth()+1; 
var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
var yyyy = today.getFullYear();

var footer_text = "Thank you very much for your support. Passion Over Fame.";