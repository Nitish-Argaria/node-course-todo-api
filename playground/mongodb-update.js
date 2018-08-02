const {MongoClient,ObjectID} = require('mongodb');

MongoClient.connect('mongodb://127.0.0.1:27017/TodoApp',(err,client)=>{
	if(err){
		console.log('Unable to connect to mongodb server');

	}
	console.log('Connected to monogdb server');

	const db = client.db('TodoApp');

	// db.collection('Todos').findOneAndUpdate({
	// 	_id: new ObjectID("5b62ece3dfe0bf5d0998e29e")
	// },{
	// 	$set: {
	// 		completed:true
	// 	}
	// },
	// {
	// 	returnOriginal:false
	// }).then((result)=>{
	// 	console.log(result);
	// });

	db.collection('Users').findOneAndUpdate({
		name:'Shivangi'
	},{
		$set: {
			name:'Nitish'
		}
	},
	{
		returnOriginal:false
	}).then((result)=>{
		console.log(result);
	});

	db.collection('Users').findOneAndUpdate({
		name:'Nitish'
	},{
		$inc: {
			age:1
		}
	},
	{
		returnOriginal:false
	}).then((result)=>{
		console.log(result);
	});

});