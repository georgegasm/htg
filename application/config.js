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