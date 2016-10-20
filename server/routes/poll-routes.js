let express = require('express'),
		pollRouter = express.Router(),
		authenticate = require('../middleware/authenticate'),
		PollController = require('../controllers/poll-controllers'),
		Poll = require('../models/Poll');

// Also, need a share route, would that be done on the front end exclusively?

// **GET** all the polls
pollRouter.get('/polls', (req, res) => {
	PollController.getPolls(res);
});

// **GET** a single poll based on poll id
pollRouter.get('/polls/single/:id', (req, res) => {
	PollController.getSinglePoll(res, {_id: req.params.id});
});

// **PATCH** vote +1 on a poll
pollRouter.patch('/polls/vote/:id', (req, res) => {
	PollController.voteOnOption(req, res, req.params.id);
});

// AUTHENTICATION
pollRouter.use((req, res, next) => {
	authenticate.verify(req, res, next);
})

// **POST** a new poll 
pollRouter.post('/polls', (req, res) => {
	console.log(req.body);
	const newPoll = Object.assign({}, req.body.poll)
	PollController.createPoll(newPoll, res);
})

// **GET** all polls created by user
pollRouter.get('/polls/:userId', (req, res) => {
	PollController.getPolls(res, {createdBy: req.params.userId});
});		

pollRouter.route('/polls/:id')
	
	// **PATCH** a new option into a poll
	.patch((req, res) => {
		console.log(req);
		PollController.addNewOptionAndVote(res, req.params.id, req.body.votedFor);
	})

	// **DELETE** a poll
	.delete((req, res) => {
		PollController.deletePoll(res, req.params.id);
	})

module.exports = pollRouter;