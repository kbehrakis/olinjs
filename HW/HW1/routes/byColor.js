var express = require('express');
var db = require('../fakeDatabase');


var byColor = function(req, res){
   var cats = db.getAll();
   var msg = "";

   // Extract the desired color from the URL
   var desiredColor = req.params.color;

   cats.forEach(function(cat){
        // Extract the possible colors for the cat in the list
	var catColors = cat.colors;

	// If the array of colors includes desired colors, list the cat
	if(catColors.includes(desiredColor)){
   	  msg = msg + "A " + cat.age + " year-old cat named " +cat.name + ". Colors include "+cat.colors +". \n";
        }
   })

    // Send the output to the webpage
    res.render("listCats", {message: msg});
};

// The home page for this will be whatever is returned by the byColor variable
module.exports.home = byColor;
