var http = require('http');
var fs = require('fs');
var path = require('path');
var hostname = 'localhost';
var port = 3000;

var server = http.createServer(function(req,res){
	if(req.method == 'GET'){
		var fileUrl;
		if(req.url =='/') //default page
		fileUrl = '/index.html';
		else 
		fileUrl = req.url;
		var filePath = path.resolve('./public'+fileUrl);//get the full system path
		var fileExt =  path.extname(filePath);//get the extension from filePath
		fs.exists(filePath, function(exists){
			if(!exists){
				res.writeHead(404, { 'Content-Type': 'text/html' });
				res.end('<h1> Error 404: ' + fileUrl + ' not found!');
			}
			else{
				fs.createReadStream(filePath).pipe(res);
			}
		});
	}
});

server.listen(port, hostname, function(){
	console.log(`Server running at http://${hostname}:${port}`);
})