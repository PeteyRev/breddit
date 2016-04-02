var Backbone = require('backbone');

var CommentsCollection = Backbone.Collection.extend({
		url: '/comments/',
		model: CommentModel
	});

moduel.exports = CommentsCollection;