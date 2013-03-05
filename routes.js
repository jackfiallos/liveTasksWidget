/**
 * Routes module definition
 * 
 * @author Jackfiallos
 * @link https://github.com/jackfiallos/liveTasksWidget
 *
 **/

var site = require('./controllers/siteController');

module.exports = function(app){
	app.post('/save', site.saveTask);
};