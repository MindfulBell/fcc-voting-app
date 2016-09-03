let express = require('express'),
		pollRouter = express.Router(),
		Poll = require('../models/Poll');


//AUTHENTICATION IS NEXT. Can only access this stuff if the user is authenticated!

pollRouter.route('/polls')
	
	// **CREATE** a new pull
		.post((req, res) => {
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

	// **GET** all of the polls
		.get((req, res) => {
			Poll.find({}, (err, polls) => {
				if (err) {
					return res.send(err);
				}
				res.json(polls);
			})
		})

pollRouter.route('/polls/:id?')

	// **GET** all polls created by user, or single poll
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
			// else, we are just finding a single poll, so get that
			else {
				Poll.findById(id, (err, poll) => {
					if (err) {
						return res.send(err)
					}
					res.json(poll);
				})		
			}
		})		

	// **PATCH** update a poll with either a vote increase, or a newly added option
		.patch((req, res) => {
			Poll.findById(req.params.id, (err, poll) => {
				if (err) {
					return res.send(err)
				}
				//need to add some kind of validation/check that they haven't voted already?
				let userVote = req.body.votedFor.toLowerCase();
				let newOption = true;
				poll.options.forEach((option) => {
					if (option.optionName === userVote) {
						option.votes += 1;
						newOption = false;
					}
					return option;
				})

				if (newOption) {
					poll.options = [...poll.options, { optionName: userVote, votes: 1 }];
				}

				poll.save((err) => {
						if (err) {
							return res.send(err);
						}
						return res.json({message: "Successfully updated and/or voted!"})
					})
			})
		})

		.delete((req, res) => {
			Poll.findOneAndRemove(req.params.id, (err) => { 
				if (err) {
					return res.send(err)
				} 
				else {
					res.json({message: "Successfully removed poll!"})
				}
			})
		})

module.exports = pollRouter;