let express = require('express'),
		pollRouter = express.Router(),
		Poll = require('../models/Poll');

pollRouter.route('/polls')
	
	//create a new poll
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

	//get all of the polls
		.get((req, res) => {
			Poll.find({}, (err, polls) => {
				if (err) {
					return res.send(err);
				}
				res.json(polls);
			})
		})

pollRouter.route('/polls/:pollId')

		.get((req, res) => {
			let pollId = req.params.pollId;
			Poll.findById(pollId, (err, poll) => {
				if (err) {
					return res.send(err)
				}
				res.json(poll);
			})
		})

//update a poll with either a vote increase, or a newly added option
		.put((req, res) => {
			let pollId = req.params.pollId;
			Poll.findById(pollId, (err, poll) => {

				//voted on something
				//need to add some kind of validation/check that they haven't voted already? ip?
				if (req.body.votedFor) {
					poll.options = poll.options.map((option) => {
						if (option.optionName === req.body.votedFor) {
							option.votes += 1;
						}
						return option;
					})
				}

				//added and voted for a new option
				if (req.body.newOption) {
					let currentOptions = poll.options.map((option) => { return option.optionName.toLowerCase() })
					let newOption = req.body.newOption;

					if (currentOptions.includes(newOption.toLowerCase())) {
						return res.json({message: "That option exists already!"})
					}
					else {
						poll.options = [...poll.options, {optionName: req.body.newOption, votes: 1}]						
					}
				}

				poll.save((err) => {
						if (err) {
							res.send(err);
						}

						res.json(poll)
					})
				
			})
		})

// find all polls created by a user (using the user ID)
pollRouter.route('/polls/:userId')

	.get((req, res) => {
		console.log(req.params.userId)
		let createdBy = req.params.userId;
		Poll.find( {createdBy}, (err, polls) => {
			if (err) {
				return res.send(err)
			}
			res.json(polls);
		})
	})

module.exports = pollRouter;