require('./part6_module')(process.argv[2], process.argv[3], function callback(err,list){
  if(err){
	console.log(err);
  }
  
  list.forEach(function (value){
		console.log(value);
	       })
})

