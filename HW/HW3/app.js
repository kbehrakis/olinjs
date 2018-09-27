// Standard require statements
var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var exphbs  = require('express-handlebars');

// Mongoose setup - We will use the ingredients database
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/ingredients');

// Specific file require statements
var getIngredients = require('./routes/getIngredients.js');

var app = express();

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// GET/POST requests for the necessary actions
app.get('/ingredients', getIngredients.listIngredients);
app.post('/addIngredient', getIngredients.addIngredient);
app.post('/outOfStock', getIngredients.outOfStock);
app.post('/editIngredient', getIngredients.editIngredient);

var PORT = 3000;
app.listen(PORT, function() {
  console.log("App running on port:", PORT);
});
