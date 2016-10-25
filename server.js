'use strict';

require('dotenv').config();
let express = require('express'),
		app = express(),
		cors = require('cors'),
		morgan = require('morgan'),
		path = require('path'),
		bodyParser = require('body-parser'),
		mongoose = require('mongoose'),
		favicon = require('serve-favicon'),
		port = process.env.PORT || 3000,
		userRouter = require('./server/routes/user-routes'),
		pollRouter = require('./server/routes/poll-routes'),
		authenticate = require('./server/middleware/authenticate'),
		db = process.env.MONGODB_MLAB || process.env.DB_URL;

mongoose.connect(db);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(cors());
app.use(express.static('client'));
app.use(favicon(path.join(process.cwd(),'client','public','favicon.ico'));

app.post('/api/authenticate', (req, res) => {
	authenticate.encode(req, res);
})

app.use('/api', userRouter);

app.use('/api', pollRouter);

app.get('*', function (req, res){
  res.sendFile(`${process.cwd()}/client/public/index.html`);
})

app.listen(port, (req, res)=>{
	console.log(`Listening on port ${port}`);
})