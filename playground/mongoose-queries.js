const{ObjectID} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');

const {User} = require('./../server/models/user');

// var id = "5b6594647008087bdf041ce411";

// if(!ObjectID.isValid(id)){
// 	console.log('ID not valid');
// }
// Todo.find({
// 	_id: id
// }).then((todos)=>{
// 	console.log('Todos',todos);
// });

// Todo.findOne({
// 	_id: id
// }).then((todo)=>{
// 	console.log('Todo',todo);
// });

// Todo.findById(id).then((todo)=>{
// 	if(!todo)
// 		return console.log('Id Not found');
// 	console.log('Todo by ID ',todo);
// }).catch((e)=> console.log(e));

var id = "5b64042cafa30e6fd096d815";
User.findById(id).then((user)=>{
	if(!user)
		return console.log('User not found');
	console.log('User by ID',user);
}).catch((e) => console.log(e));