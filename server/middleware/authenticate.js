let User = require('../models/User'),
		secret = process.env.SECRET_KEY,
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
						username: user.username,
						id: user._id,
						success: true,
						message: 'Token granted.',
						token: token
					});
				}
			}
		})
	},

	verify: function(req, res, next) {
		let token = req.body.token || req.query.token || req.headers['x-access-token'];
		if (token) { 
			jwt.verify(token, secret, (err, decoded) => {
				if (err) {
					return res.status(403).send({
						success: false,
						message: 'Failed to authenticate token.'
					})
				}
				else {
					req.decoded = decoded;
					next();
				}
			})			
		}
		else {
			return res.status(403).send({
				success: false,
				message: 'No token provided.'
			})
		}
	}
} 

module.exports = authenticate;