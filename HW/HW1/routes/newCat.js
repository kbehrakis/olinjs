var express = require('express');
var db = require('../fakeDatabase');


// Function to populate the cat object
function Cat(name, age, colors){
  var cat = {
    name:name,
    age:age,
    colors:colors,
  };
  return cat;
}

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
    var age = getRandomInt(0,21);

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

    // Add the cat to the database
    db.add(Cat(name, age, colors));

    // Send the output to the webpage
    res.render("newCat", {name: name, age: age, colors:colors});
};


// The home page for this will be whatever is returned by the newCat variable
module.exports.home = newCat;
