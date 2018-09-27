var fs = require('fs');
var input = process.argv;

var buffer = fs.readFile(input[2], callback);

function callback(err,data){
  if(err){
	return console.log(err);
  }
  var array = data.toString().split('\n');
  console.log(array.length-1);

}

