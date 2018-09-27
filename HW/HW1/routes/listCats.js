var express = require('express');
var db = require('../fakeDatabase');


var listCats = function(req, res){
   var cats = db.getAll();
   var msg = "";

   // Sorting function based on age (http://www.javascriptkit.com/javatutors/arraysort2.shtml)
   cats.sort(function(a,b){
	return a.age-b.age;
   })

   cats.forEach(function(cat){
   	msg = msg + "A " + cat.age + " year-old cat named " +cat.name + ". Colors include "+cat.colors +". \n";
   })

    // Send the output to the webpage
    res.render("listCats", {message: msg});
};

// The home page for this will be whatever is returned by the listCats variable
module.exports.home = listCats;
