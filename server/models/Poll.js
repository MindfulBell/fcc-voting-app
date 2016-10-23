let mongoose = require('mongoose'),
		Schema = mongoose.Schema;

let PollSchema = new Schema({
	createdBy: { type: String, required: true },
	title: { type: String, required: true },
	options: [ { optionName: { type: String, lowercase: true, trim: true }, votes: Number } ],
	totalVotes: { type: Number },
	usersVoted: Array
});

module.exports = mongoose.model('Poll', PollSchema);
