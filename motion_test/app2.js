var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var fs = require('fs');
var path = require('path');
 
var spawn = require('child_process').spawn;
var proc;
 
//app.use('/', express.static(path.join(__dirname)));
 
 
app.get('/', function(req, res) {
  res.send('does this work, rasp pi');
});

let port = 8082;
 
app.listen(port, function() {
  console.log('listening on *:' + port);

  //var host = server.address().address;
  //var port = server.address().port;

  //console.log('host', host)
  //console.log('port', port)
});
 
