var mongoose = require('mongoose');

// Create a Schema
var aUser = mongoose.Schema({
  username: String
});

module.exports = mongoose.model("user", aUser);

