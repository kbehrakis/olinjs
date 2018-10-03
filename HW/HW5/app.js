// Standard require statements
var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var exphbs  = require('express-handlebars');
var session = require('client-sessions');


// Mongoose setup - We will use the ingredients database
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/twitter');


// Specific file require statements
var account = require('./routes/account.js');
var home = require('./routes/index.js');

var app = express();

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
	cookieName: 'session',
	secret: 'random-string',
	duration: 30 * 60 * 1000,
	activeDuration: 5 * 60 * 1000,
}));


// GET/POST requests for homepage actions
app.get('/', home.showHomepage);
app.post('/addTweet', home.addTweet);
app.post('/deleteTweet', home.deleteTweet);

// GET/POST requests for login actions
app.get('/login', account.login);
app.post('/login', account.authenticate);


var PORT = 3000;
app.listen(PORT, function() {
  console.log("App running on port:", PORT);
});
