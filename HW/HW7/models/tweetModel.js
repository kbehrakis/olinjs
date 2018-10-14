var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var todo = new Schema({
	task: String,
	time: Number
	status: String
});

module.exports = mongoose.model('TodoList', todo);
