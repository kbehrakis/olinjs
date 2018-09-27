var fs = require('fs');
var input = process.argv;

var buffer = fs.readFileSync(input[2]);
var stringFile = buffer.toString();

var array = stringFile.split('\n');
console.log(array.length-1);
