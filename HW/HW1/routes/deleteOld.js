var express = require('express');
var db = require('../fakeDatabase');

var deleteOld = function(req, res){
   var cats = db.getAll();
   var msg = "";
   var currentIndex = 0;
   var maxIndex = 0;
   var maxAge = 0;

   // Check if there are cats in the list 
   if(cats.length <= 0){
     res.render("deleteOld", {age: "null", name: "null", colors: "null"});
   }
   else{
	   // Finding the index with the max age value
	   cats.forEach(function(cat){
		if(cat.age > maxAge){
		  maxAge = cat.age;
		  maxIndex = currentIndex;
		}
		currentIndex++;
	   })
	 
	   db.remove(maxIndex);

   	  // Send the output to the webpage
   	  res.render("deleteOld", {age: cats[maxIndex].age, name: cats[maxIndex].name, colors: cats[maxIndex].colors});
   }
};

module.exports.home = deleteOld;
