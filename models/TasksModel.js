/**
 * TasksModel File
 * 
 * @author Jackfiallos
 * @link https://github.com/jackfiallos/liveTasksWidget
 *
 **/

/**
 * Variables definition
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	ObjectId = Schema.ObjectId;

/**
 * Clase schema
 */
var TasksModel = new Schema({
	id: ObjectId,
	uri: {type:String, required:true, allowNull:false, trim:true, lowercase:true },
	task: { type:String, required:true, allowNull:false, trim:true, lowercase:true },
	creation_date: { type:Date, default:Date.now }
});

var Tasks = mongoose.model('Tasks', TasksModel);

module.exports = Tasks;