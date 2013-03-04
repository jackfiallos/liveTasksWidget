
/**
 * Module dependencies.
 */

// var express = require('express')
//   , http = require('http')
//   , path = require('path')
//   , app = module.exports = express();

var express = require('express')
  , app = module.exports = express()
  , path = require('path')
  , server = require('http').createServer(app)
  , io = require('socket.io').listen(server);

require('./configuration')(app, express, path);
require('./routes')(app);

server.listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});

io.sockets.on('connection', function(socket){
	console.log('Server listen');
});