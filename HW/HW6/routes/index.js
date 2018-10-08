var express = require('express');
var passport = require('passport');
var router = express.Router();

// Create an objects using the model templates defined in the models folder
var User = require('../models/userModel');
var Tweet = require('../models/tweetModel.js')


/*************************** LOGIN *******************************/
// Loads the homepage
// Should show the tweets (along with the name of the creator) and list all users
router.get('/', function (req, res) {
    // Sort the tweets by time added and add the creator's name
    Tweet.find({}).sort({_id: -1}).populate('creator').exec(function(err, tweets) {
	    // Get all the users
            User.find({}, function(err, users) {
		// Extract the information to populate the index page
                res.render('index', {
                    user: req.user,
                    twotes: tweets,
                    users: users
                });
            })
        });
});

// Load the register page
router.get('/register', function(req, res) {
    res.render('register', { });
});

// Register the user based on the input provided
router.post('/register', function(req, res) {
    User.register(new User({ username : req.body.username, name : req.body.username}), req.body.password, function(err, account) {
        if (err) {
            return res.status(500).send(err.message);
        }

        passport.authenticate('local')(req, res, function () {
            res.redirect('/');
        });
    });
});

// Load the login page
router.get('/login', function(req, res) {
    res.render('login', { user : req.user });
});

// Once logged in, redirect to the main twitter page
router.post('/login', passport.authenticate('local'), function(req, res) {
    res.redirect('/');
});

// Logout the user and redirect back to the main page where user can log in again
router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});


/*************************** TWEET ACTIONS *******************************/
// Create a new tweet
router.post('/newTwote', function(req, res) {
	var text = req.body.twoteText;
	var thisTweet = new Tweet({
		text: text,
		creator: req.user._id
	});

	thisTweet.save(function (err) {
		if (err) return handleError(err);
		Tweet.populate(thisTweet, {path:"creator"}, function(err, tweet) {
			res.send(tweet);
		});
	});
});

// Delete a tweet
router.post('/delTwote',function(req, res) {
	Tweet.findById(req.body.id, function (err, tweet) {
		if (err){
		  return handleError(err);
		}

		// Delete the given tweet
		tweet.remove(function(err) {
			if (err){
			  return handleError(err);
			}
			res.send(tweet);
		})
	});
});


module.exports = router;
