require('dotenv').config();
let express = require('express'),
		app = express(),
		morgan = require('morgan'),
		path = require('path'),
		bodyParser = require('body-parser'),
		mongoose = require('mongoose'),
		port = process.env.PORT || 3000,
		userRouter = require('./server/routes/user-routes'),
		pollRouter = require('./server/routes/poll-routes'),
		authenticate = require('./server/middleware/authenticate'),
		db = process.env.DB_URL;

mongoose.connect(db);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// NEED TO ADD THIS AS A FALLBACK TO ALL ROUTES IN ROUTER
// app.get('*', function (request, response){
//   response.sendFile(path.resolve(__dirname, 'public', 'index.html'))
// })

app.get('/', (req, res)=>{
	res.send('HELLO THERE!');
})

app.post('/api/authenticate', (req, res) => {
	authenticate.encode(req, res);
})

app.use('/api', userRouter);

app.use('/api', pollRouter);

app.listen(port, (req, res)=>{
	console.log(`Listening on port ${port}`);
})




/*

Connecting to mlab:

mongodb://<dbuser>:<dbpassword>@ds011321.mlab.com:11321/fcc-tb

Connecting locally:

mongodb://localhost/db_name


*/