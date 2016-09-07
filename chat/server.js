var express = require("express");
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

users = [];
connections = [];

server.listen(process.env.PORT || 3000);
console.log('Server running..');
//Get requests??

app.get('/', function(req, res){
  res.sendFile( __dirname + '/index.html');
});

io.sockets.on('connection', (socket) => {
  connections.push(socket);
  console.log('Connected: %s sockets connected', connections.length);

  //Disconnect
  socket.on('disconnect', (data)=>{
    connections.splice(connections.indexOf(socket),1);
    console.log('Disconnected: %s sockets connected', connections.length);
  });
  //Send message
  socket.on('send message', (data)=>{
    console.log(data);
    io.sockets.emit('new message', {msg: data});
  });

});
