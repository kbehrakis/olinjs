var path = require('path');
var Ingredient = require('../models/ingredientModel.js');
var Order = require('../models/orderModel.js');

var routes = {};
var total = 0;


/****************************** ORDER ************************************/
// The GET request (as called in app.js)
// This will list out the current ingredients in the database so the user can choose from them
routes.chooseIngredients = function(req, res) {
  Ingredient.find({stock:true},function(err, ingredients) {
    res.render('order',{'ingredients':ingredients});
  });
}


// This will show the checklist of possible ingredients and track which items are selected
routes.checkbox = function(req, res) {
  Ingredient.findOne({_id: req.body.id}, function(err, ingredient){
    if (err) {
      console.log("Problem loading the ingredients",err);
    };

    // If the checkbox is checked off, add it to the price
    if (req.body.state == 'true') {
      total = total + ingredient.price;
    }
    else {
      total = total - ingredient.price;
    }

    res.send({total:total})
  });

};


// The POST request (as called in app.js)
// This will add an order to the order database and reset the price
routes.addNewOrder = function(req, res) {
  // Ingredients will be in a string form, so we want to split into substrings at the spaces
  // This gives us an array of substrings
  var prev_order = req.body.ingredients.split(' ');

  // This joins the substrings with a comma separating items
  prev_order.join();
 
  // Construct the new order
  var newOrder = new Order({
			ingredients: prev_order, 
			price: total
		     });

  // Save the new order and reset the total
  newOrder.save(function(err){
    if (err) {
      console.log("Problem saving the order", err);
    }
    total = 0;
    res.send();
  });
};



/****************************** KITCHEN ************************************/
// The GET request (as called in app.js)
// This will list out the current ingredients in the database ->
routes.listOrders = function(req, res) {
  Order.find(function(err,orders){
    if (err) {
      console.log("Problem displaying orders",err);
    };
    // Go through and list all orders in the database
    res.render('kitchen',{'order':orders})
  });
}


// Updates the database so completed order is removed
routes.completeOrder = function(req, res) {
  // Find the order and remove it
  Order.findOne({_id: req.body.id}).deleteOne(function(err,order) {
    if (err) {
      console.log("Problem showing the completed orders", err)
    };
  });
};

module.exports = routes;
