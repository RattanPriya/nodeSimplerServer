//Modules
var http = require("http");
var path = require("path");
var url = require("url");
var fs = require("fs");

// Array of Mime Types
var mimeTypes = {
	"html": "text/html",
	"jpeg": "image/jpeg",
	"jpg": "image/jpg",
	"png" : "image/png",
	"js" : "text/javascript",
	"css" : "text/css"

};

http.createServer(function(req, res) {
	//gives the pathname
	var uri = url.parse(req.url).pathname;

	var fileName = path.join(process.cwd(), unescape(uri));
	console.log("Loading" + uri);

	///We want to make sure the file in the path exists
	var stats;
	try {
		stats = fs.lstatSync(fileName);
	}
	catch(e) {
		//if file is not found we want to send the client 404
		res.writeHead(404, {'Content-type': 'text/plain'});
		res.write('404 not found');
		res.end();
		return ;
	}

	if (stats.isFile()) {
		var mimeType = mimeTypes[path.extname(fileName).split('.').reverse()[0]];
		res.writeHead(404, {'Content-type': mimeType});
		var fileStream = fs.createReadStream(fileName);
		fileStream.pipe(res);
	} else if (stats.isDirectory()) {
		res.writeHead('303', {
			'Location' : 'index.html'
		});
		res.end();
	} else {
		res.writeHead('500', {
			'Content-type' : 'text/plain'
		});
		res.write('500 Internal Error\n');
		res.end();
	}
}).listen(1337, '127.0.0.1');

console.log("Server running at http://127.0.0.1");