/**
 * Module dependencies
 * 
 * @author Jackfiallos
 * @link https://github.com/jackfiallos/liveTasksWidget
 *
 **/

var express = require('express')
  , app = module.exports = express()
  , path = require('path')
  , mongoose = require('mongoose')
  , server = require('http').createServer(app)
  , io = require('socket.io').listen(server, { log: false });

require('./configuration')(app, express, path);
require('./io')(io);
require('./routes')(app);

mongoose.connect(app.get('db-uri'));

server.listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});

// io.sockets.on('connection', function(socket){
// 	console.log('Server listen');
// });