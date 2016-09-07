let express = require('express'),
		pollRouter = express.Router(),
		authenticate = require('./authenticate'),
		Poll = require('../models/Poll');

//Also, need a share route, would that be done on the front end exclusively?

// **GET** all the polls
pollRouter.get('/polls', (req, res) => {
	Poll.find({}, (err, polls) => {
		if (err) {
			return res.send(err);
		}
		res.json(polls);
	})
});

// **GET** a single poll based on poll id, does not need AUTH
pollRouter.get('/polls/single/:id', (req, res) => {
	Poll.findById(req.params.id, (err, poll) => {
		if (err) {
			return res.send(err)
		}
		res.json(poll);
	})		
})

// **PATCH** vote +1 on a poll
pollRouter.patch('/polls/single/:id', (req, res) => {
	Poll.findById(req.params.id, (err, poll) => {
		if (err) {
			return res.send(err)
		}
		//need to add some kind of validation/check that they haven't voted already?
		let userVote = req.body.votedFor.toLowerCase();
		let message = "No such option!";
		poll.options.forEach((option) => {
			if (option.optionName === userVote) {
				option.votes += 1;
				message = "Successfully voted!";
			}
			return option;
		})

		poll.save((err) => {
			if (err) {
				return res.send(err);
			}
			return res.json({message})
		});
	});
});

// AUTHENTICATION
pollRouter.use((req, res, next) => {
	let token = req.body.token || req.query.token || req.headers['x-access-token'];

	if (token) {
		authenticate.decode(token, req, res);
		next();
	}
	else {
		return res.status(403).send({
			success: false,
			message: 'No token provided.'
		});
	}
})

// **CREATE** a new poll 
pollRouter.post('/polls', (req, res) => {
	let poll = new Poll();

	poll.createdBy = req.body.createdBy;
	poll.title = req.body.title;
	poll.options = req.body.options;
	poll.save((err) => {
		if (err) {
			return res.send(err);
		}
		res.json({success: true, message: "New poll created!"});
	})	
})

pollRouter.route('/polls/:id?')

	// **GET** all polls created by user
	.get((req, res) => {

		let id = req.params.id;
		let userQuery = req.query.q === 'user';

		// if we supplied a userId, get all the polls they made
		if (userQuery) {
			let createdBy = req.params.id;
			Poll.find( {createdBy}, (err, polls) => {
				if (err) {
					return res.send(err)
				}
				 res.json(polls);
			})
		}
		else {
			res.json({ success: false, message: 'Please supply proper url'})
		}
	})		

	// **PUT** a new option into a poll
	.patch((req, res) => {
		// WHEN ABSTRACTING, change these to exec and get a promise back??
		Poll.findById(req.params.id, (err, poll) => {
			if (err) {
				return res.send(err)
			}
			let userVote = req.body.votedFor.toLowerCase(),
					optionPresent = false,
					message = "Successfully added and voted for new option!";
			// get users ip somehow and don't let them vote again!

			// check if the option is already present
			poll.options.forEach((option) => {
				if (option.optionName === userVote) {
					optionPresent = true;
					message = "Option already available. Please vote.";
				}
			})
			poll.options =  optionPresent ? poll.options : [...poll.options, { optionName: userVote, votes: 1 }];
			poll.save((err) => {
				if (err) {
					return res.send(err);
				}
				return res.json({message})
			});
		});
	})

	// **DELETE** a poll
	.delete((req, res) => {
		Poll.findOneAndRemove(req.params.id, (err) => { 
			if (err) {
				return res.send(err)
			} 
			else {
				res.json({message: "Successfully deleted poll!"})
			}
		})
	})

module.exports = pollRouter;