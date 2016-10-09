let User = require('../models/User');

class UserController {
	saveUser(user, res) {
		user.save((err) => {
			if (err) {
				if (err.code == 11000) {
					return res.status(200).json({success: false, message: "A user with that name already exists"});
				}
				else {
					console.log(err);
					return res.status(500).send(err);
				}
			}
			return res.status(200).json(user)
		});
	}
	registerUser(newUser, res) {
		let user = new User(newUser);
		this.saveUser(user, res)
	}

	getAllUsers(res) {
		User.find({}, (err, users) => {
			if (err) return res.status(500).send(err);
			return res.status(200).json(users);
		})
	}

	updateUser(req, res) {
		User.findById(req.params.userId, (err, user) => {
			if (err) {
				return res.status(500).send(err);
			}
			user.username = req.body.username;
			user.password = req.body.password;
			this.saveUser(user, res);
		});		
	}

	deleteUser(id, res) {
		User.findByIdAndRemove(id, (err, user) => { 
			if (err) return res.status(500).send(err);
			else res.status(200).json(user);
		});
	}
}

const userController = new UserController();

module.exports = userController;