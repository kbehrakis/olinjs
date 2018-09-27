var path = require('path');

// Create an ingredient using the object template defined in the models folder
var Ingredient = require('../models/ingredientModel.js');

var routes = {};

// The GET request (as called in app.js)
// This will list out the current ingredients in the database
routes.listIngredients = function(req, res) {
  // Only show ingredients with stock
  Ingredient.find({stock:true},function(err, ingredients) {
    res.render('home',{'ingredients':ingredients});
  });
}

// The POST request (as called in app.js)
// This will add an ingredient to the ingredient database
routes.addIngredient = function(req, res) {
  // Create and populate new ingredient object
  var newIngredient = new Ingredient ( {
      name: req.body.name,
      price: req.body.price,
      stock: true,
  });

  // Save the new ingredient to the database
  newIngredient.save(function(err) {
    if (err) {
      console.log("Problem adding ingredient", err);
    };
    Ingredient.find(function(ingredients) {
      res.send(newIngredient);
    })
  });
}


// Updates the database value to be out of stock
routes.outOfStock = function(req, res) {
  Ingredient.findOne({_id: req.body.id}, function(err, ingredient) {
    if (err) {
      console.log("Cannot show the out of stock ingredients", err)
    };

    // Update the stock value for the ingredient to be false
    ingredient.stock = false;
    ingredient.save();
  });
};


// Update the name or price for a given ingredient
routes.editIngredient = function(req, res) {
  // Find the matching ingredient 
  Ingredient.findOne({_id: req.body.id}, function(err,ingredient) {
    if (err) {
      console.log("Problem editing ingredient", err)
    };

    // Update the database fields for this ingredient
    ingredient.name = req.body.name;
    ingredient.price = req.body.price;
    ingredient.save();
  });
}

module.exports = routes;
