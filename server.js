
var http = require('http');

var server = http.createServer(function(request,response){
	
	response.writeHead(200,{"Content-type" : "text/html"});
	response.end("Hello Node!!");

});

server.listen(3000,"localhost");
