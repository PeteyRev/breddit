
	var SubbredditModel = Backbone.Model.extend({
		urlRoot: 'subbreddits/',
		idAttribute: 'id',

		parse: function(response) {
			if (response.posts) {
				response.posts = new PostsCollection(response.posts);
			}
			return response;
		}
	});

module.exports = SubbredditModel;