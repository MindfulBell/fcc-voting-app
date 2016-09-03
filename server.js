let express = require('express'),
		app = express(),
		morgan = require('morgan'),
		path = require('path'),
		bodyParser = require('body-parser'),
		mongoose = require('mongoose'),
		port = process.env.PORT || 3000,
		userRouter = require('./app/routes/user-routes'),
		pollRouter = require('./app/routes/poll-routes'),
		db = 'mongodb://MindfulBell:Dontmlab02!@ds011321.mlab.com:11321/fcc-tb';

mongoose.connect(db);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('dev'));

app.get('/', (req, res)=>{
	res.send('HELLO THERE!');
})

app.use('/api', userRouter);

app.use('/api', pollRouter);

app.listen(port, (req, res)=>{
	console.log(`Listening on port ${port}`);
})




/*

How many Routers will I need? 
	2 + basic homepage route?
How will my data look?

Connecting to mlab:

mongodb://<dbuser>:<dbpassword>@ds011321.mlab.com:11321/fcc-tb

Connecting locally:

mongodb://localhost/db_name


*/