//Modules
var http = require("http");
var path = require("path");
var url = require("url");
var fs = require("fs");

var mimeTypes = {
	"html": "text/html",
	"jpeg": "image/jpeg",
	"jpg": "image/jpg",
	"png" : "image/png",
	"js" : "text/javascript",
	"css" : "text/css"

};

http.createServer(function(req, res) {
	res.writeHead(200, {'Content-Type': 'text/plain' });
	res.end('Hello World \n');
}).listen(1337, '127.0.0.1');
console.log("Server running at http://127.0.0.1");