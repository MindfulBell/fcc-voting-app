let express = require('express'),
		User = require('../models/User'),
		userRouter = express.Router();

		userRouter.route('/users')

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
				res.json({ message: 'User created!'})
			})
		})

		.get((req, res) => {
			User.find({}, (err, users) => {
				if (err) {
					res.send(err);
				}
				res.json(users);
			})
		})

		// .put('/users/:userId', (req, res) => {
			
		// })

		// .delete('/users/:userId' (req, res) => {

		// })

module.exports = userRouter;