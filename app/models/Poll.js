let mongoose = require('mongoose'),
		Schema = mongoose.Schema;

let PollSchema = new Schema({
	createdBy: { type: String, required: true },
	title: { type: String, required: true },
	options: [ { optionName: String, votes: Number } ],
	totalVotes: { type: Number }
});

module.exports = mongoose.model('Poll', PollSchema);
