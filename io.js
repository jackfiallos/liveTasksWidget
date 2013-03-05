/**
 * Sockets module
 * 
 * @author Jackfiallos
 * @link https://github.com/jackfiallos/liveTasksWidget
 *
 **/

var socketio = function (io) { 
  if (!io) return socketio._io;  
  socketio._io = io;
} 

module.exports = socketio;