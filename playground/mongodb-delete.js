
 const {MongoClient,ObjectID} = require('mongodb');

MongoClient.connect('mongodb://127.0.0.1:27017/TodoApp',(error,client)=>{
	if(error){
		return console.log('Unable to connect MongoDB server');

	}
	console.log('Connected to MongoDB server');
	const db = client.db('TodoApp');

	//deleteMany

	// db.collection('Todos').deleteMany({text:'Eat lunch'}).then((result)=>{
	// 	console.log('Users');
	// 	console.log(result);
	// },(error)=>{
	// 	console.log('Unable to fetch Users',error)
	// });
	//deleteOne
	// db.collection('Todos').deleteOne({text:'Eat lunch'}).then((result)=>{
	// 	console.log('Users');
	// 	console.log(result);

	// },(error)=>{
	// 	console.log('Unable to ftech Users',error);
	// });

	//findOneAndDelete
	// db.collection('Todos').findOneAndDelete({completed:false}).then((result)=>{
	// 	console.log(result);

	// },(error)=>{
	// 	console.log('Unable to fetch users');
	// });

	// db.collection('Users').deleteMany({name:'Nitish'}).then((result)=>{
	// 	console.log('Users');
	// 	console.log(result);
	// },(error)=>{
	// 	console.log('Unable to fetch users');
	// });
	db.collection('Users').findOneAndDelete({age:18}).then((result)=>{
		console.log(result);
	},(error)=>{
		console.log('Unable to fetch users');
	});


	//client.close();
});    //takes two attribute first database url 