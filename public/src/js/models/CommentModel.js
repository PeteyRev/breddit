var Backbone = require('backbone');

var CommentModel = Backbone.Model.extend({
		urlRoot: '/comments/',
		idAttribute: 'id'
	});

module.exports = CommentModel;