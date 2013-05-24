var http = require('http');

var options = {
	host : 'shapeshed.com',
	port : 80,
	path : '/'
};

http.get(options,function(response){

	if(response.statusCode == 200){
		console.log("The site is up and running");
	}else{
		console.log("The site is down!!");
	}

}).on('error',function(e){

	console.log("There was an error");
});
