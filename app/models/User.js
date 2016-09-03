let mongoose = require('mongoose'),
		Schema = mongoose.Schema,
		bcrypt = require('bcrypt-nodejs');

let UserSchema = new Schema({
	username: { type: String, required: true, index: { unique: true } },
	password: { type: String, required: true }
})

// add password hashing
// add validation

let User = mongoose.model('User', UserSchema)

module.exports = User;