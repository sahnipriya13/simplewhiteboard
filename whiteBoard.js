var http = require('http');
	fs = require('fs');
	
var app = http.createServer(function(request , response){	
		fs.readFile("whiteBoard.html",'utf-8', function(error, data){
			response.writeHead(200,{'Content-Type':'text/html'});
			response.write(data);
			response.end();
		});
}).listen(80);
console.log("Server running");

var io = require('socket.io').listen(app);

io.sockets.on('connection', function(socket)
{
		socket.on('mousemove',function(data)
		{
			socket.broadcast.emit("moving",data);
		});
});