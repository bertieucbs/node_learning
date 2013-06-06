var http = require('http');
var fs = require('fs');

var server = http.createServer(function(request,response){

	fs.readFile('./index.html',function(err,data){
		if(!err){
				response.writeHead(200,{"Content-Type" : "text/html"});
				response.end(data);
			}else{
				throw err;
			}
	});
	

}).listen(3000,'localhost');

var io = require('socket.io').listen(server);
var total_users = 0;

io.sockets.on('connection',function(socket){

	console.log('Client connected');
	total_users++;
	socket.emit('users',{count : total_users});
	socket.broadcast.emit('users',{count : total_users});
		
		socket.on('disconnect',function(){
		
			total_users--;
			socket.broadcast.emit('users',{count : total_users});
			console.log('Client disconnected');

		});

		socket.on('message',function(data){
			console.log('message recieved from the client : ' +  data.message)	
			socket.broadcast.emit('push_message',data);
			socket.emit('push_message',data);
			
		});


});
