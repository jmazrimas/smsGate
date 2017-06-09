const pool = require('./lib/db');
var express = require('express');
var exphbs  = require('express-handlebars');
var models = require('./modelInterface')
var app = express();

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.set('port', (process.env.PORT || 5000));

app.get('/', function (req, res) {
    res.render('home');
});

app.get('/requests', function(request, response) {
	console.log(models.getRequests())
	response.send(JSON.stringify(models.getRequests()));
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});