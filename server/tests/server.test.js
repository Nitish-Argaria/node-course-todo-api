const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const { app } = require('./../server');
const { Todo } = require('./../models/todo.js');
const {User} = require('./../models/user');

const {todos,populateTodos,users,populateUsers} = require('./seed/seed')
beforeEach(populateTodos);
beforeEach(populateUsers);

describe('POST /todos',()=>{
	it('should create a new todo',(done)=>{
		var text = 'Test todo text';
		// Todo.find().then((todos)=>{
		// 	expect(todos.length).toBe(1);
		// 	expect(todos[0].text).toBe(text);
		// }).catch((e)=>{
		// 	console.log(e);
		// });

		request(app)
		.post('/todos')
		.send({text})
		.expect(200)
		.expect((res)=>{
			expect(res.body.text).toBe(text);
		})
		.end((err,res)=>{
			if(err){
				return done(err);
			}

			Todo.find({text}).then((todos)=>{
				expect(todos.length).toBe(1);
				expect(todos[0].text).toBe(text);
				done();
			}).catch((e) =>  done(e));
		});
	});

	it('should not create todo with invalide body data',(done)=>{
		var text =''
		request(app)
		.post('/todos')
		.send({text}) 
		.expect(400)
		.end((err,res)=>{
			if(err)
			{
				return done(err);
			}
			Todo.find().then((todos)=>{
				expect(todos.length).toBe(2);
				done();
			}).catch((e)=> done(e));
		});
	});
});

describe('Get /todos',()=>{
	it('should get all todos',(done)=>{
		request(app)
		.get('/todos')
		.expect(200)
		.expect((res)=>{
			expect(res.body.todos.length).toBe(2)
			})
		.end(done);
	})
});

describe('Get /todos/:id',()=>{
	it('should return todo docs',(done)=>{
		request(app)
		.get(`/todos/${todos[0]._id.toHexString()}`)
		.expect(200)
		.expect((res)=>{
			expect(res.body.todo.text).toBe(todos[0].text);
		})
		.end(done);
	});

	it('should return 404 if todo is not found',(done)=>{
		var _id = new ObjectID();
		request(app)
		.get(`/todos/${_id.toHexString()}`)
		.expect(404)
		.end(done);
	});

	it('should return 404 for non-object ids',(done)=>{
		request(app)
		.get('/todos/123abc')
		.expect(404)
		.end(done);
	});
});

describe('DELETE /todos/:id',()=>{
	it('should return remove a todo',(done)=>{
		var _id =todos[1]._id.toHexString();
		request(app)
		.delete(`/todos/${_id}`)
		.expect(200)
		.expect((res)=>{
			expect(res.body.todo._id).toBe(_id);
		})
		.end((err,res)=>{
			if(err){
				return done(err);
			}
			Todo.findById(_id).then((todo)=>{
				expect(todo).toBeFalsy();     //instead of toNotExist use toBeFalsy()
				done();

			}).catch((e)=> done(e));

		});
	});
	it('should return 404 if todo is not found',(done)=>{
		var _id = new ObjectID();
		request(app)
		.delete(`/todos/${_id.toHexString()}`)
		.expect(404)
		.end(done);
	});

	it('should return 404 for non-object ids',(done)=>{
		request(app)
		.delete('/todos/123abc')
		.expect(404)
		.end(done);
	});
});

// test for patch
describe('/PATCH /todos/:id',()=>{
	it('should update the todo',(done)=>{
		var _id = todos[0]._id.toHexString();
		var body = {
			completed: true,
			text:'changing completed'
		};
		request(app)
		.patch(`/todos/${_id}`)
		.send(body)
		.expect(200)
		.expect((res)=>{
			expect(res.body.todo.text).toBe(body.text);
			expect(res.body.todo.completed).toBe(true);
			expect(res.body.todo.completedAt).toBeTruthy()
		})
		.end(done);


	});
	it('should clear completedAt when todo is not completed',(done)=>{
		var _id = todos[1]._id.toHexString();
		var body = {
			completed:false,
			text:'testing update'
		};
		request(app)
		.patch(`/todos/${_id}`)
		.send(body)
		.expect(200)
		.expect((res)=>{
			expect(res.body.todo.text).toBe(body.text);
			expect(res.body.todo.completed).toBe(false);
			expect(res.body.todo.completedAt).toBeFalsy();
		})
		.end(done);
	});
});

//Test for authentication 

describe('/GET /users/me',()=>{
	it('should return user if authenticated',(done)=>{
		request(app)
		.get('/users/me')
		.set('x-auth',users[0].tokens[0].token)
		.expect(200)
		.expect((res)=>{
			//console.log(res.body._id,users[0]._id);
			expect(res.body._id).toBe(users[0]._id.toHexString());
			expect(res.body.email).toBe(users[0].email);

		})
		.end(done);

	});
	it('should return 401 if not authenticated',(done)=>{
		request(app)
		.get('/users/me')
		.expect(401)
		.expect((res)=>{
			expect(res.body).toEqual({});
		})
		.end(done);
	});
});

// Test for Signup

describe('POST /users',()=>{
	it('should create a user',(done)=>{
		var email = 'example@example.com';
		var password = '123mnb';
		request(app)
		.post('/users')
		.send({email,password})
		.expect(200)
		.expect((res)=>{
			expect(res.headers['x-auth']).toBeTruthy();// we should use bracket notation instead of . if our pbject is having hyphen
			expect(res.body._id).toBeTruthy();
			expect(res.body.email).toBe(email);
		})
		.end((err)=>{
			if(err){
				return done(err);
			}
			User.findOne({email}).then((user)=>{
				expect(user).toBeTruthy();
				expect(user.password).not.toBe(password);
				done();
			}).catch((e)=> done(e));
		});

	});
	it('should return validation error if request invalid',(done)=>{
		var email = 'example'
		var password = 'userThreePass';
		request(app)
		.post('/users')
		.send({email,password})
		.expect(400)
		.end(done);

	});
	it('should not create user  if email is in use',(done)=>{
		var email = 'shivangi@gmail.com';
		var password= 'userOnePass'

		request(app)
		.post('/users')
		.send({email,password})
		.expect(400)
		.end(done);
	});
});

//for testin login working fine
describe('POST /users/login',()=>{
	it('should  login user and return auth token',(done)=>{
		request(app)
		.post('/users/login')
		.send({
			email:users[1].email,
			password:users[1].password
		})
		.expect(200)
		.expect((res)=>{
			expect(res.headers['x-auth']).toBeTruthy();
		})
		.end((err,res)=>{
			if(err){
				return done(err);
			}
			User.findById(users[1]._id).then((user)=>{
				expect(user.tokens[0]).toMatchObject({     //Instead of toInclude use toMatchObject
					access:'auth',
					token:res.headers['x-auth']
				});
				done();
			}).catch((e)=> done(e));
		});
	});
	it('should reject invalid login ',(done)=>{
		request(app)
		.post('/users/login')
		.send({
			email:users[1].email,
			password:users[1].password+'1'
		})
		.expect(400)
		.expect((res)=>{

			expect(res.headers['x-auth']).toBeFalsy(); 
		})
		.end((err,res)=>{
			if(err)
			{
				done(err);
			}
			User.findById(users[1]._id).then((user)=>{
				expect(user.tokens.length).toBe(0);
				done();
			}).catch((e)=>done(e));
		});

	});

})




