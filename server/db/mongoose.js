var mongoose = require('mongoose');

//var mongoose.Promise = global.Promise;
let db = {
	localhost : 'mongodb://localhost:27017/TodoApp',
	mlab: 'mongodb://root:root123@ds213612.mlab.com:13612/todoapp'
}

mongoose.connect(process.env.MONGODB_URI || db.localhost);

//mongoose.connect(db.mlab|| db.localhost);

module.exports = {
	mongoose
};