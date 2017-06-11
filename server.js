const pool = require('./lib/db');
var express = require('express');
var exphbs  = require('express-handlebars');
var app = express();
var models = require('./server/models/index');
var bodyParser = require('body-parser');
var storedRequests = []

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.set('port', (process.env.PORT || 5000));
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', function (req, res) {
  res.render('home');
});

app.get('/requests', function(req, res) {
	console.log('GET requests')
	// models.request.findAll({}).then(function(requests) {
	// 	res.setHeader('Content-Type', 'application/json');
	// 	res.send(JSON.stringify(requests));
 //  });
 	res.setHeader('Content-Type', 'application/json');
	res.send(JSON.stringify(storedRequests));
	storedRequests = [];
});

app.post('/requests', function(req, res) {
	console.log('POST received request create')
	var smsFrom = req.body.From.replace('+','');
	var smsBody = req.body.Body;

	storedRequests.push(smsBody)

	models.user.findOne({
	  where: {
	    phone: smsFrom
	  }
	}).then(function(reqUser){
		if (!reqUser) {
			res.writeHead(200, {'Content-Type': 'text/xml'});
				res.end('<Response><Message>Not authorized</Message></Response>');
		} else {
			models.request.create({ message: smsBody, actioned: false, userId: reqUser.id })
			.then(function(newRequest) {
				res.writeHead(200, {'Content-Type': 'text/xml'});
				res.end('<Response><Message>Request received by smsGate</Message></Response>');
			})
		}
	});
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

