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
				if (req.body.option) {
					//go through array of options in the poll.options array
				}

				//added a new option
				if (req.body.newOption) {
					// add a new option to vote on...spread operator?
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