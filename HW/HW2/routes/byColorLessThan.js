var express = require('express');
var db = require('../fakeDatabase');
var Cat = require('../models/cat.js');


var byColor = function(req, res){
   // Extract the desired color and number from the URL
   var desiredColor = req.params.color;
   var desiredNumber = req.params.number;

   Cat.find({$and: [{colors: {$size: desiredNumber}}, {colors: desiredColor}]}).sort({age: 1}).exec(function(err, cats) {
													  if(err){
							    			  	  		     console.log("Error listing cats by color.");
													  }
													  else if (cats){
							    			  			     res.render("listCats", {message:cats});
													  }
				  		    							});

};

// The home page for this will be whatever is returned by the byColor variable
module.exports.home = byColor;
