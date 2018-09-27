var express = require('express');
var db = require('../fakeDatabase');
var Cat = require('../models/cat.js');


var deleteOld = function(req, res){
    var oldest = Cat.findOne().sort({age: -1}).exec(function(err, cat){
							if(err){
							  console.log("Error deleting.")
							}
							else{
							  res.render("deleteOld", {age: cat.age, name: cat.name, colors: cat.colors});
							}
						    });
};

module.exports.home = deleteOld;
