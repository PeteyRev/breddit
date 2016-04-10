var Backbone = require('backbone');

var PostModel = require('../models/PostModel.js');
var PostsCollection = Backbone.Collection.extend({
		url: '/posts/',
		model: PostModel
	});

module.exports = PostsCollection;