const pool = require('./lib/db');
var express = require('express');
var exphbs  = require('express-handlebars');
var app = express();
var models = require('./server/models/index');

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.set('port', (process.env.PORT || 5000));

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
	models.request.create({ actioned: false, userId: 1 })
  .then(function(request) {
  	res.setHeader('Content-Type', 'application/json');
		res.send(JSON.stringify(request));
  });
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});