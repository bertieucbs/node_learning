
var http =  require('http');
var fs = require('fs');

var counter = 0;

var server = http.createServer(function(request,response){

	fs.readFile('./index.html',function(err,data){
	
		response.writeHead(200,{'Content-Type' : 'text/html'});
		response.end(data);
		
	});
	
}).listen(3000,"127.0.0.1");

console.log('The server is listening on http://127.0.0.1:3000');

var io = require('socket.io').listen(server);

io.sockets.on('connection',function(socket){

	counter++;
	console.log('Total user connected = ' + counter);
	socket.broadcast.emit('message',{users : counter});
	socket.emit('message',{users : counter});
	
	socket.on('disconnect',function(){
		counter--;
		console.log('The user is disconnected');
		console.log('Total user connected after disconnect = ' + counter);
		socket.broadcast.emit('message',{users : counter});
	});

});
