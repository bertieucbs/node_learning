
var http = require('http');
var url = require('url');

var server = http.createServer(function(request,response){
	
	var pathname = url.parse(request.url).pathname;

	if(pathname === '/'){
		response.writeHead(200,{"Content-type" : "text/html"});
		response.end("Home Page\n");
	}else if(pathname === '/about'){
		response.writeHead(200,{"Content-type" : "text/html"});
		response.end("About Us");
	}else if(pathname === '/redirect'){
		response.writeHead(301,{"Location" : "/"});
		response.end();
	}else{
		response.writeHead(404,{"Content-type" : "text/html"});
		response.end("Page not found");
	} 	

});

server.listen(3000,"localhost");

console.log("Server running on localhost on port 3000");

