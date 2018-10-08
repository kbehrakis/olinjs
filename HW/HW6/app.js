// Standard require statements
var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var exphbs  = require('express-handlebars');
var favicon = require('serve-favicon');


// Mongoose setup - We will use the twitter database
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/twitter');

// Facebook authentication require statements
var passport = require('passport');
var auth = require('./oauth.js');
var FacebookStrategy = require('passport-facebook').Strategy;
var LocalStrategy = require('passport-local').Strategy;
var session = require('express-session');


// Specific file require statements
var User = require('./models/userModel');
var routes = require('./routes/index');

var app = express();

// view engine setup
var hbs = require('hbs');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
hbs.registerHelper('ifCond', function(v1, v2, options) {
  if(v1 === v2) {
    return options.fn(this);
  }
  return options.inverse(this);
});

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());



// **** Passport Setup: taken from provided passport example ****
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ secret: 'this is not a secret ;)',
  cookie:{},
  resave: false,
  saveUninitialized: false }));

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});


// **** Facebook Authorization ****
// Extract information from the auth.js file 
// http://www.passportjs.org/docs/facebook/
// http://www.passportjs.org/docs/oauth/
passport.use(new FacebookStrategy({
    clientID: auth.FACEBOOK_APP_ID,
    clientSecret: auth.FACEBOOK_APP_SECRET,
    callbackURL: auth.FACEBOOK_CALLBACK_URL
  },
  function(accessToken, refreshToken, profile, done) {
    // Search to see if profile is in the database already
    // If not in database already, create the account
    User.findOrCreate({username:profile.displayName}, function(error, user){
	if(error){
	  console.log(error);
	  return done(error);
	}
	else if(!user){
	  return done(null, false);
	}

	return done(null, user);
    })
  }
));

app.get('/auth/facebook', passport.authenticate('facebook'),
    function(req, res){}
);

app.get('/auth/facebook/callback',
    passport.authenticate('facebook', { failureRedirect: '/' }),
    function(req, res) {
        res.redirect('/');
    }
);

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) { return next(); }
    res.redirect('/');
}


// **** Local Authorization ****
passport.use(new LocalStrategy(User.authenticate()));


// All of the GET/POST calls are within the index file
app.use('/', routes);

module.exports = app;


var PORT = 3000;
app.listen(PORT, function() {
  console.log("App running on port:", PORT);
});
