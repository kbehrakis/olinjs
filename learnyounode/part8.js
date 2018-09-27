var http = require('http');
var bl = require('bl');
var input = process.argv;
var get = http.get(input[2], callback);

function callback(response){
  response.pipe(bl(function(err, data){
			if(err){
				return console.error(err);
			}
			data = data.toString()
			console.log(data.length)
			console.log(data)
		  }))
}

