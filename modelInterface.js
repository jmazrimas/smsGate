var models = require('./server/models/index');

module.exports = {
	addUser: function() {
	},
	getRequests: function() {
		models.request.findAll({}).then(function(requests) {
			console.log(requests)
			return requests;
  	});
	}
}