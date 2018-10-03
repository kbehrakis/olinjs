/* The purpose of this file is to change user settings depending on if user is logged in
*/

var path = require('path');

// Create an objects using the model templates defined in the models folder
var User = require('../models/userModel.js');

var routes = {};

// Show the user the login page
routes.login = function(req, res) {
  res.render("login");
}

// Log a user into their account (or create a new one if account doesn't exist)
routes.authenticate = function(req, res) {
	User.findOne({username: req.body.username}, function(err, user) {
		// If the user doesn't exist, create and populate new User object
		if (!user) {
			// Create the new user
			User.create({username: req.body.username}, function (err, newUser) {
				if (err) {
					console.error(err);
				} else {
					// Save the new user to the database
					newUser.save();
					
					// Update the session b/c the user has changed
					req.session.user = newUser;

					// Redirect to homepage
					res.send({redirect: '/'});
				}
			})
		} 
		else {
			// User exists already, so just update the session 
			req.session.user = user;
			res.send({redirect: '/'});
		}
	});
}

module.exports = routes;
