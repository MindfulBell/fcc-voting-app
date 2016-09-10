var path = require('path'),
		SRC = path.join(__dirname, 'client/public/src/'),


var config = {
	entry: './client/public/src/index.js', 
	output: { 
	     path: './client/public', 
	     filename: 'bundle.js' 
	},
	resolve: {
		root: [SRC]
	}
}
module.exports = config;
