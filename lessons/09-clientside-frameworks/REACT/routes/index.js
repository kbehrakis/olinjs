var express = require('express');
var router = express.Router();

//returns the home page handlebars template, index.hbs
router.get('/', function(req, res, next) {
	res.json({'text' : 'Hello World'});
});

module.exports = router;
