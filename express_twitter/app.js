var express = require('express');

var app = express()
, http = require('http')
, server = http.createServer(app);

var twitter = require('ntwitter');

app.listen(3000);

var twit = new twitter({

	consumer_key : 'f8dPnnGmkGmAiLg92jEbPQ',
	consumer_secret : 'hrV4mcoaE0yyRrjUwFHAcYMUMpdZsEPDjgR2gEZzSPM',
	access_token_key : '40403280-A6MDrFayhRoESeeHO4jiOxbMph21HlsvEjQO3rl88',
	access_token_secret : '7izo92Vdydqsa52ic4AeWL5dkQjY9mpm5KQ9yE3QI4'
});

twit.stream('statuses/filter',{track : ['love','hate']},function(stream){

	stream.on('data', function(data){
		
		//console.log(data.user.screen_name + ' : ' + data.text);
		io.sockets.volatile.emit('tweet',{
			user : data.user_screen_name,
			text : data.text
		});
	});
});


app.get('/',function(req,res){
	res.sendfile(__dirname + '/index/html');
});
