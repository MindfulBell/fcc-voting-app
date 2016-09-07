let User = require('../models/User'),
		secret = 'topsecretformyglipglops', //when pushed up to Heroku, definitely need to use env variables
		jwt = require('jsonwebtoken');

let authenticate = {
	encode: function(req, res){
		User.findOne({username: req.body.username}).select('username password').exec((err, user) => {
			if (err) {
				throw err;
			}
			if (!user) {

				res.json({
					success: false,
					message: 'Authentication failed.'
				});
			}
			else if (user) {
				if (!user.comparePassword(req.body.password)) {
					res.json({
						success: false,
						message: 'Authentication failed.'
					});
				}
				else {
					let token = jwt.sign({
						username: user.username
					}, secret, {
						expiresIn: '12h'
					});
					res.json({
						success: true,
						message: 'Token granted.',
						token: token
					});
				}
			}
		})
	},

	decode: function(token, req, res) {
		jwt.verify(token, secret, (err, decoded) => {
			if (err) {
				return res.status(403).send({
					success: false,
					message: 'Failed to authenticate token.'
				})
			}
			else {
				req.decoded = decoded;
			}
		})
	}
} 

module.exports = authenticate;