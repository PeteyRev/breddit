var CommentModel = Backbone.Model.extend({
		urlRoot: '/comments/',
		idAttribute: 'id'
	});

module.exports = CommentModel;