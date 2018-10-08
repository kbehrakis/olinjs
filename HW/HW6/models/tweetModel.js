var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Tweet = new Schema({
	text: String,
	creator: {type: Schema.Types.ObjectId, ref: 'User'}
});

module.exports = mongoose.model('Tweet', Tweet);
