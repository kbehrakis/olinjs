var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var exphbs  = require('express-handlebars');

var index = require('./routes/index');

// Add in the new web pages for adding and listing cats
var listCats = require('./routes/listCats');
var newCat = require('./routes/newCat');
var byColor = require('./routes/byColor');
var deleteOld = require('./routes/deleteOld');

var app = express();

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', index.home);

// Add in the new file paths to access new web pages
app.get('/cats', listCats.home);
app.get('/cats/new', newCat.home);
app.get('/cats/bycolor/:color', byColor.home);
app.get('/cats/delete/old', deleteOld.home);

app.listen(3002);
