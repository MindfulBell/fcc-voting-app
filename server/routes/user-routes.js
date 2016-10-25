'use strict';

let express = require('express'),
		authenticate = require('../middleware/authenticate'),
		userController = require('../controllers/user-controller'),
		userRouter = express.Router();


// CREATE/REGISTER a new user
userRouter.post('/users/register', (req, res) => {
		const newUser = Object.assign({}, req.body);
		userController.registerUser(newUser, res)
	});

userRouter.post('/users/authenticate', (req, res) => {
	authenticate.verify(req, res, false, true);
})


//GET all of the users

userRouter.get('/users', (req, res) => {
	userController.getAllUsers(res);
	});

userRouter.route('/users/:userId')

	//UPDATE a user's info
	.put((req, res) => {
		userController.updateUser(req, res)
	})

	//DELETE a user
	.delete((req, res) => {
		userController.deleteUser(req.params.userId, res);
	})

module.exports = userRouter;