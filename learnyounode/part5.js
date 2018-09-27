var fs = require('fs');
var path = require('path');

var input = process.argv;
var fileType = process.argv[3];

var read = fs.readdir(input[2],callback);


function callback(err,list){
  if(err){
	console.log(err);
  }
  
  for(var i = 0; i < list.length; i++){
	if(path.extname(list[i]) == "."+fileType){
		console.log(list[i]);
	}
  }
}

