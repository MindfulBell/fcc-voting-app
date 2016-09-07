let express = require('express'),
		User = require('../models/User'),
		userRouter = express.Router();

// DO I NEED TO AUTHENTICATE HERE??

userRouter.route('/users')

	//CREATE a new user (Combine this with PUT somehow?)

	.post((req, res) => {
		let user = new User();

		user.username = req.body.username;
		user.password = req.body.password;

		user.save((err) => {
			if (err) {
				if (err.code == 11000) {
					return res.json({success: false, message: "A user with that name already exists"});
				}
				else {
					return res.send(err);
				}
			}
			res.json({ message: 'User created!' })
		})
	})

	//GET all of the users
	.get((req, res) => {
		User.find({}, (err, users) => {
			if (err) {
				res.send(err);
			}
			res.json(users);
		})
	})

userRouter.route('/users/:userId')

	//UPDATE a user's info
	.put((req, res) => {
		User.findById(req.params.userId, (err, user) => {
			if (err) {
				return res.send(err);
			}
			if (req.body.username) {
				user.username = req.body.username;
			}
			if (req.body.password) {
				user.password = req.body.password;
			}
			user.save((err) => {
				if (err) {
					return res.send(err)
				}
				res.json({ message: 'User updated!' })
			})
		})
	})

	//DELETE a user
	.delete((req, res) => {
		User.findOneAndRemove(req.params.userId, (err) => { 
			if (err) {
				return res.send(err)
			} 
			else {
				res.json({message: "Successfully removed User!"})
			}
		})
	})

module.exports = userRouter;