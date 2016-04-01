var PostModel = Backbone.Model.extend({
		urlRoot: 'posts/',
		idAttribute: 'id',

		parse: function(response) {
			if (response.subbreddit) {
                var SubbredditModel = require('./SubbredditModel.js');
				response.subbreddit = new SubbredditModel(response.subbreddit);
			}
			return response;
		}
	});

module.exports = PostModel;