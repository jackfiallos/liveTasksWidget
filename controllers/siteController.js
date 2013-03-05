/**
 * SiteController File
 * 
 * @author Jackfiallos
 * @link https://github.com/jackfiallos/liveTasksWidget
 *
 **/

var Tasks = require('../models/TasksModel');
var io = require('../io')();
/**
 *
 */
exports.saveTask = function(request, response){
	var data = {
		uri: request.body.uri,
		task: request.body.task
	};

	if ((data.uri != undefined) && (data.task != undefined)){
		new Tasks(data).save(function(err){
			if (err) {
				console.log(err);
				return response.json(err);
			}
			else {
				console.log(data);
				io.sockets.on('connection', function (socket) {
				    socket.emit('news', data);
				});
				return response.json(data);
			}
		});
	}
}