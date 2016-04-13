var Backbone = require('backbone');
var _ = require('underscore');

var SubbredditsListView = require('./SubbredditsListView.js');
var SubbredditsCollection = require('../collections/SubbredditsCollection.js');
var PostsCollection = require('../collections/PostsCollection.js');
var UserModel = require('../models/UserModel.js');


var HomeView = Backbone.View.extend({
	el:'\
		<div class="container">\
              <div class="small-7 columns">\
                    <h3 class="text-center">Posts</h3>\
					<div class="row">\
						<div class="small-12 columns" id="posts"></div>\
					</div>\
					<div class="row">\
						<div class="small-12 columns"></div>\
					</div>\
				</div>\
				<div class="small-5 columns">\
					<ul class="tabs" data-tab>\
					  <li class="tab-title active"><a href="#all-subbreddits">All</a></li>\
					  <li class="tab-title"><a href="#subscribed-subbreddits">Subscribed</a></li>\
					</ul>\
					<div class="tabs-content">\
					  <div class="content active" id="all-subbreddits"></div>\
					  <div class="content" id="subscribed-subbreddits"></div>\
					</div>\
				</div>\
		</div>\
	',

	insertAllSubbreddits: function() {
		var subbreddits = new SubbredditsCollection();
		subbreddits.fetch();
		var subbredditsListView = new SubbredditsListView({ 
			collection: subbreddits
		});
		this.$el.find('#all-subbreddits').html(subbredditsListView.render().el);
	},

	insertSubscribedSubbreddits: function() {
		var that = this;
	  var currentUser = new UserModel({id:$('[data-user-id]').data('user-id')});
		currentUser.fetch({
			success: function() {
				var subbredditsListView = new SubbredditsListView({ 
					collection: currentUser.get('subscribed_subbreddits')
				});

				that.$el.find('#subscribed-subbreddits').html(subbredditsListView.el);
  			subbredditsListView.render();
			}
		});
	},

	insertPosts: function() {
		var posts = new PostsCollection();
		posts.fetch();
		var PostsListView = require('./PostsListView.js');
		var postsListView = new PostsListView({ 
			collection: posts
		});
		this.$el.find('#posts').html(postsListView.render().el);
	},

	render: function() {
		this.insertAllSubbreddits();
		this.insertSubscribedSubbreddits();
		this.insertPosts();
		$(document).foundation('reflow', 'tabs');
		return this;
	}
});

module.exports = HomeView;