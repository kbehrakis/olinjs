var express = require('express');
var db = require('../fakeDatabase');
var Cat = require('../models/cat.js');


// Get a random value between 2 integers (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random)
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}


// The call that will add a new cat
var newCat = function(req, res){
    // Create a random string for the name
    var alphabet = "abcdefghijklmnopqrstuvwxyz";
    var nameLength = getRandomInt(1,10);
    var name = "";

    for(var i = 0; i < nameLength; i++){
	name = name + alphabet[getRandomInt(0, 26)];
    }

    // Get a random age
    var randomAge = getRandomInt(0,21);

    // Choosing a random color from a list of possible colors
    var arrayLength = getRandomInt(1,4); 
    var colorChoices = ["brown", "black", "white","grey", "yellow", "tan", "orange"];
    var colors = [];

    // Include however many random colors 
    for(var i = 0; i < arrayLength; i++){
	colors[i] = colorChoices[getRandomInt(0, colorChoices.length)];
    }

    // Remove duplicates
    colors = colors.filter(function(value, index, self) {return index == self.indexOf(value)});

    // Create a new cat
    var aCat = new Cat({name: name, age: randomAge, colors: colors});
    
    // Add the cat to the database
    aCat.save(function (err) {
      if (err) {
        console.log("Problem saving the new cat", err);
	res.render("newCat", "Problem saving the new cat.");
      }
    });

    // Send the output to the webpage
    res.render("newCat", {name: name, age: randomAge, colors:colors});
};


// The home page for this will be whatever is returned by the newCat variable
module.exports.home = newCat;
