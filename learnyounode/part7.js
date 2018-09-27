var http = require('http');
var input = process.argv;
var get = http.get(input[2], callback);

function callback(response){
  response.setEncoding("utf8");
  response.on("data", console.log);
  response.on("error",console.log);
}

