const{ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');

const {User} = require('./../server/models/user');

// Todo.remove({ })

// Todo.remove({}).then((result)=>{
// 	console.log(result);
// });

Todo.findOneAndRemove({_id: '5b6821ce2d3ed596e29dcf24'}).then((todos)=>{
	console.log(todos)
});

// Todo.findByIdAndRemove('5b6821bd2d3ed596e29dcf22').then((todos)=>{
// 	console.log(todos)
// });