
 const {MongoClient,ObjectID} = require('mongodb');


// MongoClient.connect('mongodb://127.0.0.1:27017/TodoApp',(error,client)=>{
// 	if(error){
// 		return console.log('Unable to connect MongoDB server');

// 	}
// 	console.log('Connected to MongoDB server');
// 	const db = client.db('TodoApp');
// 	db.collection('Todos').find().count().then((count)=>{
// 		console.log('Todos');
// 		console.log(`Todos count ${count}`);
// 	},(error)=>{
// 		console.log('Unable to fetch todos',error)
// 	})


// 	//client.close();
// });    //takes two attribute first database url 

MongoClient.connect('mongodb://127.0.0.1:27017/TodoApp',(error,client)=>{
	if(error){
		return console.log('Unable to connect MongoDB server');

	}
	console.log('Connected to MongoDB server');
	const db = client.db('TodoApp');
	db.collection('Users').find({name:'Nitish'}).toArray().then((docs)=>{
		console.log('Users');
		console.log(JSON.stringify(docs,undefined,2));
	},(error)=>{
		console.log('Unable to fetch Users',error)
	})


	//client.close();
});    //takes two attribute first database url 