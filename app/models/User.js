let mongoose = require('mongoose'),
		Schema = mongoose.Schema,
		bcrypt = require('bcrypt-nodejs');

let UserSchema = new Schema({
	username: { 
		type: String, 
		required: true, 
		minlength: 6, 
		maxlength: 100, 
		index: { unique: true } 
	},

	password: { 
		type: String, 
		required: true, 
		minlength: 6, 
		maxlength: 100, 
		validate: { 
			validator: (v) => { 
				return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\\/!@#$%^&*()_-]).*$/g.test(v); 
			},
			message: 'Password must contain 1 uppercase letter, 1 lowercase letter, and 1 special character!',
		} 
	}
})

// add password hashing

UserSchema.pre('save', function(next){
	let user = this;
	//hash pass only if password has been changed or user is new
	if (!user.isModified('password')) return next();

	bcrypt.hash(user.password, null, null, (err, hash) => {
		if (err) return next();

		//change to has
		user.password = hash;
		next();
	})
})

UserSchema.methods.comparePassword = (password) => {
	return bcrypt.compareSync(password, user.password);
}

module.exports = mongoose.model('User', UserSchema);