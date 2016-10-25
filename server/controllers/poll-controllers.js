'use strict';

let Poll = require('../models/Poll');

class PollController {

	savePoll(poll, res) {
		poll.save((err) => {
			if (err) return res.status(500).send(err);
			return res.status(200).json(poll);
		});
	}

	getPolls(res, id) { 
		const pollId = id === undefined ? {} : id;
		Poll.find(pollId, (err, polls) => {
			if (err) {
				return res.status(500).send(err);
			}
			return res.status(200).json(polls);
		})
	}

	getSinglePoll(res, id) {
		Poll.findById(id, (err, poll) => {
			if (err) return res.status(500).send(err);
			return res.status(200).json(poll);
		})
	}

	voteOnOption(req, res, id) {
		Poll.findById(id, (err, poll) => {
			if (err) return res.status(500).send(err);
			const userIp = req.body.userIp;
			poll.options.forEach((option) => {
				if (option.optionName === req.body.votedFor) {
					option.votes += 1;
					poll.usersVoted = [...poll.usersVoted, userIp]
				}
				return option;
			})
			this.savePoll(poll, res);
		});
	}

	addNewOptionAndVote(res, id, votedFor, userIp) {
		Poll.findById(id, (err, poll) => {
			if (err) return res.status(500).send(err);
			poll.options = [...poll.options, { optionName: votedFor, votes: 1 } ];
			poll.usersVoted = [...poll.usersVoted, userIp]
			this.savePoll(poll, res);
		});	
	}

	createPoll(newPoll, res) {
		let poll = new Poll(newPoll);
		this.savePoll(poll, res);
	}

	deletePoll(res, id) {
		Poll.findByIdAndRemove(id, (err) => { 
			if (err) return res.status(500).send(err)
			return res.status(200).json({message: "Successfully deleted poll!"})
		});	
	}
}
const pollController = new PollController();

module.exports = pollController 