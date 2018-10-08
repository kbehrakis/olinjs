var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var User = new Schema({
	oauthID: Number,
	name: String,
	created: Date,
	username: String,
	password: String
});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);

