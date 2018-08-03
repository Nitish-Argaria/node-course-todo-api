var mongoose = require('mongoose');

//var mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/TodoApp');

module.exports = {
	mongoose
};