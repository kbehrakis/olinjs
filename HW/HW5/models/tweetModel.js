var mongoose = require('mongoose');

// Create a Schema
var aTweet = mongoose.Schema({
  username: String,
  content: String,
  timeAdded: Number
});

module.exports = mongoose.model("tweet", aTweet);

