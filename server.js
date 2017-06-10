const pool = require('./lib/db');
var express = require('express');
var exphbs  = require('express-handlebars');
var app = express();
var models = require('./server/models/index');
var bodyParser = require('body-parser');

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.set('port', (process.env.PORT || 5000));
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', function (req, res) {
  res.render('home');
});

app.get('/requests', function(req, res) {
	models.request.findAll({}).then(function(requests) {
		res.setHeader('Content-Type', 'application/json');
		res.send(JSON.stringify(requests));
  });
});

app.post('/requests', function(req, res) {
	console.log('received request create')
	var smsFrom = req.body.From.replace('+','');
	var smsBody = req.body.Body;
	models.user.findOne({
	  where: {
	    phone: smsFrom
	  }
	}).then(function(reqUser){
		if (!reqUser) {
			console.log('no user found')
		} else {
			models.request.create({ actioned: false, userId: reqUser.id })
			.then(function(newRequest) {
				console.log('request created')
				console.log(newRequest)
			})
		}
	});
	// models.request.create({ actioned: false, userId: 1 })
 //  .then(function(request) {
 //  	res.setHeader('Content-Type', 'application/json');
	// 	res.send(JSON.stringify(request));
 //  });
 	res.send('OK')
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

