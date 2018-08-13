var env = process.env.NODE_ENV || 'development';


if(env ==='development' || env === 'test')
{
	var config = require('./config.json')     //we are adding .json at the end of the file because it's important need to find why ??
	console.log(config);
	var envConfig = config[env];
	Object.keys(envConfig).forEach((key)=>{		//Object.keys() takes object as parameter and return keys as array
 		process.env[key] = envConfig[key];
	}) ;
}
// console.log('env. ******',env);

// if(env === 'development')
// {
// 	process.env.PORT = 3000;
// 	process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoApp';
// }
// else if(env === 'test')
// {
// 	process.env.PORT = 3000;
// 	process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoAppTest';
// }