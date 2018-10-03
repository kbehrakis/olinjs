// The purpose of this file is to set up the homepage 

var path = require('path');

// Create an objects using the model templates defined in the models folder
var Tweet = require('../models/tweetModel.js');
var User = require('../models/userModel.js');

var routes = {};

// The GET request (as called in app.js)
// This will list out the current tweets and users
routes.showHomepage = function(req, res) {
	User.find({}).sort({username: 1}).select({username: 1}).exec(function (err, users) {
		if (err) {
			console.error(err);
		} else if (users) {
			Tweet.find({}).sort({timeAdded:-1}).exec(function (err, tweets) {
				if (err) {
					console.error(err);
				} else if (tweets) {
					res.render("home", {users: users, tweets: tweets});
				}
			})
		} else {
			res.render("home")
		}
	});
}

// The POST request (as called in app.js)
// This will add a tweet to the database
routes.addTweet = function(req, res) {
  // Create and populate new tweet object
   Tweet.create({username: req.session.user.username, content: req.body.text, timeAdded: req.body.time}, 			function (err, tweet) {
			if (err) {
				console.error(err);
			} else {
  				// Save the new tweet to the database
				tweet.save();
				var output = {
					username: tweet.username,
					text: tweet.content,
					timeAdded: tweet.timeAdded,
					id: tweet._id
				};
				res.json(output);
			}
		})
}


// Removes an existing tweet 
routes.deleteTweet = function(req, res) {
  // Find the tweet and remove it
  Tweet.findOne({_id: req.body.id}).deleteOne(function(err,order) {
    if (err) {
      console.log("Problem showing the deleted tweet", err)
    };
  });
};


module.exports = routes;

