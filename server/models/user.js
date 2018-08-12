const mongoose = require('mongoose');

const validator = require('validator')

const jwt = require('jsonwebtoken');

const _ = require('lodash');

const bcrypt = require('bcryptjs');

var UserSchema = new mongoose.Schema({
	email:{
		type:String,
		required:true,
		trim:true,
		minlength:1,
		unique:true,
		validate:{
			validator: validator.isEmail,
			message:'{VALUE} is not valid email'
		}

	},
	password:{
		type:String,
		require:true,
		minlength:6

	},
	tokens:[{
		access:{
			type: String,
			require:true
		},
		token:{
			type: String,
			require:true
		}
	}]

});

UserSchema.methods.toJSON = function(){
	var user = this;
	var UserObject = user.toObject();
	return _.pick(UserObject,['_id','email']);
}

UserSchema.methods.generateAuthToken = function (){
	var user = this;
	var access = 'auth';
	var token = jwt.sign({_id:user._id.toHexString(),access},'abc123').toString();
	//console.log(token);
	user.tokens = user.tokens.concat([{access,token}]);
	return user.save().then(()=>{
		return token;
	});
};

//Model method to find user providing Token
UserSchema.statics.findByToken = function(token){
	var User = this;
	var decoded ;

	try{
		decoded = jwt.verify(token,'abc123');
	}catch(e){
		return new Promise((resolve,reject)=>{			//or return new Promise.reject();
			reject();
		});
	}
	return User.findOne({
		'_id': decoded._id,
		'tokens.token':token,
		'tokens.access':'auth'

	})
};
//Model method to find  user by cred
 UserSchema.statics.findByCredentials = function(email,password){
 	var User = this;
  return  User.findOne({email}).then((user)=>{
		if(!user){
 			return new Promise.reject();
 		}
		return new Promise((resolve,reject)=>{
			bcrypt.compare(password,user.password,(err,res)=>{
				if(res){
					resolve(user); 
				}
				else{
				reject();
			}
			});

		});
		
	});
};
//UserSchema.statics.findByCredentials = function (email, password) {
//  var User = this;

//  return User.findOne({email}).then((user) => {
//    if (!user) {
//      return Promise.reject();
 //   }

    // return new Promise((resolve, reject) => {
    //   // Use bcrypt.compare to compare password and user.password
    //   bcrypt.compare(password, user.password, (err, res) => {
        // if (res) {
        //   resolve(user);
        // } else {
        //   reject();
//         // }
//       });
//     });
//   });
// };
UserSchema.pre('save',function(next) {
	var user = this;

	if(user.isModified('password')){
		bcrypt.genSalt(10,(err,salt)=>{
			 bcrypt.hash(user.password,salt,(err,hash)=>{
			 	if(err){
			 		console.log('hash can not be generated ',err);
			 		next();
			 	}
			 	user.password = hash;
			 	next();
			 });
		});
		
	}else{
		next();
	}
});

var User = mongoose.model('User',UserSchema);


module.exports = {User};