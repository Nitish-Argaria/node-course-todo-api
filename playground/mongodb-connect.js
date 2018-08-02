// const MongoClient = require('mongodb').MongoClient;
 const {MongoClient,ObjectID} = require('mongodb');

// var obj = new ObjectID();

// console.log(obj);

var user = {name:'Nitish',age:25};

var {name} = user;
console.log(name);

MongoClient.connect('mongodb://127.0.0.1:27017/TodoApp',(error,client)=>{
	if(error){
		return console.log('Unable to connect MongoDB server');

	}
	console.log('Connected to MongoDB server');
	const db = client.db('TodoApp');

	// db.collection('Todos').insertOne({
	// 	text:'Something to do',
	// 	completed:false
	// },(err,result)=>{
	// 	if(err)
	// 	{
	// 		return console.log('Unable to insert into todo',err);
	// 	}
	// 	console.log(JSON.stringify(result.ops,undefined,2));
	// });
	db.collection('Users').insertOne({
	
		name:'Nitish',
		age:26,
		location:'Mumbai'
	},(err,result)=>{
		if(err){
			return console.log('Unable to insert into users',err);
		}
		console.log(JSON.stringify(result.ops[0]._id.getTimestamp(),undefined,2));

	});
	client.close();
});    //takes two attribute first database url 