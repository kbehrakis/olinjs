var express = require('express');
var db = require('../fakeDatabase');
var Cat = require('../models/cat.js');


var listCats = function(req, res){
   Cat.find({}).sort({age: -1}).exec(function(err, cats){
							if(err){
							    console.log("Error listing cats");
							}
							else if (cats){
							    res.render("listCats", {message:cats});
							}
				  		    });
};

// The home page for this will be whatever is returned by the listCats variable
module.exports.home = listCats;
