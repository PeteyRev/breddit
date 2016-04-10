var Backbone = require('backbone');

	var UserModel = Backbone.Model.extend({
		urlRoot: 'users/',
		idAttribute: 'id',
        
		parse: function(response) {
			if (response.subscribed_subbreddits) {
                var SubbredditsCollection = require('../collections/SubbredditsCollection.js');
				response.subscribed_subbreddits = new SubbredditsCollection(response.subscribed_subbreddits);
			}
			return response;
		}
	});

module.exports = UserModel;