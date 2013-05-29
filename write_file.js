
var fs = require('fs');

var data = "Some data i want to write to a file";

fs.writeFile('file.txt',data,function(err){

	if(!err){
		console.log('Wrote to the file');
	}else{
		throw err;
	}
});
