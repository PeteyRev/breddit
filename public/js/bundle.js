(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

 $(document).on('ready', function() {

	$.ajaxSetup({
		headers: {
			'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
		}
	});
     
    var HomeView = require('./views/HomeView.js');
     
	var homeView = new HomeView();
	$('#content').html(homeView.render().el);

});
},{"./views/HomeView.js":6}],2:[function(require,module,exports){
var PostModel = require('../models/PostModel.js');
var PostsCollection = Backbone.Collection.extend({
		url: '/posts/',
		model: PostModel
	});

module.exports = PostsCollection;
},{"../models/PostModel.js":4}],3:[function(require,module,exports){
var SubbredditModel = require('../models/SubbredditModel.js');
var SubbredditsCollection = Backbone.Collection.extend({
		url: '/subbreddits/',
		model: SubbredditModel
	});

module.exports = SubbredditsCollection;
},{"../models/SubbredditModel.js":5}],4:[function(require,module,exports){
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
},{"./SubbredditModel.js":5}],5:[function(require,module,exports){

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
},{}],6:[function(require,module,exports){
var HomeView = Backbone.View.extend({
		el:'\
			<div class="container">\
				<div class="row">\
					<div class="three columns"></div>\
					<div class="six columns">\
						<div class="row">\
							<div class="twelve columns" id="posts"></div>\
						</div>\
						<div class="row">\
							<div class="twelve columns"></div>\
						</div>\
					</div>\
					<div class="three columns" id="all-subbreddits"></div>\
				</div>\
			</div>\
		',

		insertSubbreddits: function() {
            var SubbredditsCollection = require('../collections/SubbredditsCollection.js')
			var subbreddits = new SubbredditsCollection();
			subbreddits.fetch();
            var SubbredditsListView = require('./SubbredditsListView.js');
			var subbredditsListView = new SubbredditsListView({ 
				collection: subbreddits
			});
			this.$el.find('#all-subbreddits').html(subbredditsListView.render().el);
		},

		insertPosts: function() {
            var PostsCollection = require('../collections/PostsCollection.js')
			var posts = new PostsCollection();
			posts.fetch();
            var PostsListView = require('./PostsListView.js');
			var postsListView = new PostsListView({ 
				collection: posts
			});
			this.$el.find('#posts').html(postsListView.render().el);
		},

		render: function() {
			this.insertSubbreddits();
			this.insertPosts();

			return this;
		}
	});

module.exports = HomeView;
},{"../collections/PostsCollection.js":2,"../collections/SubbredditsCollection.js":3,"./PostsListView.js":7,"./SubbredditsListView.js":8}],7:[function(require,module,exports){
var PostsListView = Backbone.View.extend({
		el: '<ul></ul>',
		template: _.template('\
			<% posts.each(function(post) { %>\
				<li>\
					<a href="#"><%= post.get("title") %></a>\
					<% if (post.get("subbreddit")) { %>\
						<small><%= post.get("subbreddit").get("name") %></small>\
					<% } %>\
				</li>\
			<% }) %>\
		'),

		initialize: function() {
			this.listenTo(this.collection, 'update', this.render);
		},

		render: function() {
			this.$el.html(this.template({ posts: this.collection }));
			return this;
		}
	});

module.exports = PostsListView;
},{}],8:[function(require,module,exports){
var SubbredditsListView = Backbone.View.extend({
		el: '<ul></ul>',

		template: _.template('\
			<% subbreddits.each(function(subbreddit) { %>\
				<li><a data-id="<%= subbreddit.id %>" href="#"><%= subbreddit.get("name") %></a></li>\
			<% }) %>\
		'),

		events: {
			'click a': function(event) {
				event.preventDefault();
				var subbredditId = $(event.target).data('id');
                var SubbredditModel = require('../models/SubbredditModel.js')
				var subbreddit = new SubbredditModel({id: subbredditId});
                var PostsListView = require('./PostsListView.js');
				subbreddit.fetch({
					success: function() {
						var postsListView = new PostsListView({ 
							collection: subbreddit.get('posts')
						});
						$('#posts').html(postsListView.render().el);
					}
				});
			}
		},

		initialize: function() {
			this.listenTo(this.collection, 'update', this.render);
		},

		render: function() {
			this.$el.html(this.template({ subbreddits: this.collection }));
			return this;
		}
	});

module.exports = SubbredditsListView;
},{"../models/SubbredditModel.js":5,"./PostsListView.js":7}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJwdWJsaWMvanMvYXBwLmpzIiwicHVibGljL2pzL2NvbGxlY3Rpb25zL1Bvc3RzQ29sbGVjdGlvbi5qcyIsInB1YmxpYy9qcy9jb2xsZWN0aW9ucy9TdWJicmVkZGl0c0NvbGxlY3Rpb24uanMiLCJwdWJsaWMvanMvbW9kZWxzL1Bvc3RNb2RlbC5qcyIsInB1YmxpYy9qcy9tb2RlbHMvU3ViYnJlZGRpdE1vZGVsLmpzIiwicHVibGljL2pzL3ZpZXdzL0hvbWVWaWV3LmpzIiwicHVibGljL2pzL3ZpZXdzL1Bvc3RzTGlzdFZpZXcuanMiLCJwdWJsaWMvanMvdmlld3MvU3ViYnJlZGRpdHNMaXN0Vmlldy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDYkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNiQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIid1c2Ugc3RyaWN0JztcblxuICQoZG9jdW1lbnQpLm9uKCdyZWFkeScsIGZ1bmN0aW9uKCkge1xuXG5cdCQuYWpheFNldHVwKHtcblx0XHRoZWFkZXJzOiB7XG5cdFx0XHQnWC1DU1JGLVRPS0VOJzogJCgnbWV0YVtuYW1lPVwiY3NyZi10b2tlblwiXScpLmF0dHIoJ2NvbnRlbnQnKVxuXHRcdH1cblx0fSk7XG4gICAgIFxuICAgIHZhciBIb21lVmlldyA9IHJlcXVpcmUoJy4vdmlld3MvSG9tZVZpZXcuanMnKTtcbiAgICAgXG5cdHZhciBob21lVmlldyA9IG5ldyBIb21lVmlldygpO1xuXHQkKCcjY29udGVudCcpLmh0bWwoaG9tZVZpZXcucmVuZGVyKCkuZWwpO1xuXG59KTsiLCJ2YXIgUG9zdE1vZGVsID0gcmVxdWlyZSgnLi4vbW9kZWxzL1Bvc3RNb2RlbC5qcycpO1xudmFyIFBvc3RzQ29sbGVjdGlvbiA9IEJhY2tib25lLkNvbGxlY3Rpb24uZXh0ZW5kKHtcblx0XHR1cmw6ICcvcG9zdHMvJyxcblx0XHRtb2RlbDogUG9zdE1vZGVsXG5cdH0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFBvc3RzQ29sbGVjdGlvbjsiLCJ2YXIgU3ViYnJlZGRpdE1vZGVsID0gcmVxdWlyZSgnLi4vbW9kZWxzL1N1YmJyZWRkaXRNb2RlbC5qcycpO1xudmFyIFN1YmJyZWRkaXRzQ29sbGVjdGlvbiA9IEJhY2tib25lLkNvbGxlY3Rpb24uZXh0ZW5kKHtcblx0XHR1cmw6ICcvc3ViYnJlZGRpdHMvJyxcblx0XHRtb2RlbDogU3ViYnJlZGRpdE1vZGVsXG5cdH0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFN1YmJyZWRkaXRzQ29sbGVjdGlvbjsiLCJ2YXIgUG9zdE1vZGVsID0gQmFja2JvbmUuTW9kZWwuZXh0ZW5kKHtcblx0XHR1cmxSb290OiAncG9zdHMvJyxcblx0XHRpZEF0dHJpYnV0ZTogJ2lkJyxcblxuXHRcdHBhcnNlOiBmdW5jdGlvbihyZXNwb25zZSkge1xuXHRcdFx0aWYgKHJlc3BvbnNlLnN1YmJyZWRkaXQpIHtcbiAgICAgICAgICAgICAgICB2YXIgU3ViYnJlZGRpdE1vZGVsID0gcmVxdWlyZSgnLi9TdWJicmVkZGl0TW9kZWwuanMnKTtcblx0XHRcdFx0cmVzcG9uc2Uuc3ViYnJlZGRpdCA9IG5ldyBTdWJicmVkZGl0TW9kZWwocmVzcG9uc2Uuc3ViYnJlZGRpdCk7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gcmVzcG9uc2U7XG5cdFx0fVxuXHR9KTtcblxubW9kdWxlLmV4cG9ydHMgPSBQb3N0TW9kZWw7IiwiXG5cdHZhciBTdWJicmVkZGl0TW9kZWwgPSBCYWNrYm9uZS5Nb2RlbC5leHRlbmQoe1xuXHRcdHVybFJvb3Q6ICdzdWJicmVkZGl0cy8nLFxuXHRcdGlkQXR0cmlidXRlOiAnaWQnLFxuXG5cdFx0cGFyc2U6IGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG5cdFx0XHRpZiAocmVzcG9uc2UucG9zdHMpIHtcblx0XHRcdFx0cmVzcG9uc2UucG9zdHMgPSBuZXcgUG9zdHNDb2xsZWN0aW9uKHJlc3BvbnNlLnBvc3RzKTtcblx0XHRcdH1cblx0XHRcdHJldHVybiByZXNwb25zZTtcblx0XHR9XG5cdH0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFN1YmJyZWRkaXRNb2RlbDsiLCJ2YXIgSG9tZVZpZXcgPSBCYWNrYm9uZS5WaWV3LmV4dGVuZCh7XG5cdFx0ZWw6J1xcXG5cdFx0XHQ8ZGl2IGNsYXNzPVwiY29udGFpbmVyXCI+XFxcblx0XHRcdFx0PGRpdiBjbGFzcz1cInJvd1wiPlxcXG5cdFx0XHRcdFx0PGRpdiBjbGFzcz1cInRocmVlIGNvbHVtbnNcIj48L2Rpdj5cXFxuXHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJzaXggY29sdW1uc1wiPlxcXG5cdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVwicm93XCI+XFxcblx0XHRcdFx0XHRcdFx0PGRpdiBjbGFzcz1cInR3ZWx2ZSBjb2x1bW5zXCIgaWQ9XCJwb3N0c1wiPjwvZGl2PlxcXG5cdFx0XHRcdFx0XHQ8L2Rpdj5cXFxuXHRcdFx0XHRcdFx0PGRpdiBjbGFzcz1cInJvd1wiPlxcXG5cdFx0XHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJ0d2VsdmUgY29sdW1uc1wiPjwvZGl2PlxcXG5cdFx0XHRcdFx0XHQ8L2Rpdj5cXFxuXHRcdFx0XHRcdDwvZGl2PlxcXG5cdFx0XHRcdFx0PGRpdiBjbGFzcz1cInRocmVlIGNvbHVtbnNcIiBpZD1cImFsbC1zdWJicmVkZGl0c1wiPjwvZGl2PlxcXG5cdFx0XHRcdDwvZGl2PlxcXG5cdFx0XHQ8L2Rpdj5cXFxuXHRcdCcsXG5cblx0XHRpbnNlcnRTdWJicmVkZGl0czogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgU3ViYnJlZGRpdHNDb2xsZWN0aW9uID0gcmVxdWlyZSgnLi4vY29sbGVjdGlvbnMvU3ViYnJlZGRpdHNDb2xsZWN0aW9uLmpzJylcblx0XHRcdHZhciBzdWJicmVkZGl0cyA9IG5ldyBTdWJicmVkZGl0c0NvbGxlY3Rpb24oKTtcblx0XHRcdHN1YmJyZWRkaXRzLmZldGNoKCk7XG4gICAgICAgICAgICB2YXIgU3ViYnJlZGRpdHNMaXN0VmlldyA9IHJlcXVpcmUoJy4vU3ViYnJlZGRpdHNMaXN0Vmlldy5qcycpO1xuXHRcdFx0dmFyIHN1YmJyZWRkaXRzTGlzdFZpZXcgPSBuZXcgU3ViYnJlZGRpdHNMaXN0Vmlldyh7IFxuXHRcdFx0XHRjb2xsZWN0aW9uOiBzdWJicmVkZGl0c1xuXHRcdFx0fSk7XG5cdFx0XHR0aGlzLiRlbC5maW5kKCcjYWxsLXN1YmJyZWRkaXRzJykuaHRtbChzdWJicmVkZGl0c0xpc3RWaWV3LnJlbmRlcigpLmVsKTtcblx0XHR9LFxuXG5cdFx0aW5zZXJ0UG9zdHM6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIFBvc3RzQ29sbGVjdGlvbiA9IHJlcXVpcmUoJy4uL2NvbGxlY3Rpb25zL1Bvc3RzQ29sbGVjdGlvbi5qcycpXG5cdFx0XHR2YXIgcG9zdHMgPSBuZXcgUG9zdHNDb2xsZWN0aW9uKCk7XG5cdFx0XHRwb3N0cy5mZXRjaCgpO1xuICAgICAgICAgICAgdmFyIFBvc3RzTGlzdFZpZXcgPSByZXF1aXJlKCcuL1Bvc3RzTGlzdFZpZXcuanMnKTtcblx0XHRcdHZhciBwb3N0c0xpc3RWaWV3ID0gbmV3IFBvc3RzTGlzdFZpZXcoeyBcblx0XHRcdFx0Y29sbGVjdGlvbjogcG9zdHNcblx0XHRcdH0pO1xuXHRcdFx0dGhpcy4kZWwuZmluZCgnI3Bvc3RzJykuaHRtbChwb3N0c0xpc3RWaWV3LnJlbmRlcigpLmVsKTtcblx0XHR9LFxuXG5cdFx0cmVuZGVyOiBmdW5jdGlvbigpIHtcblx0XHRcdHRoaXMuaW5zZXJ0U3ViYnJlZGRpdHMoKTtcblx0XHRcdHRoaXMuaW5zZXJ0UG9zdHMoKTtcblxuXHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0fVxuXHR9KTtcblxubW9kdWxlLmV4cG9ydHMgPSBIb21lVmlldzsiLCJ2YXIgUG9zdHNMaXN0VmlldyA9IEJhY2tib25lLlZpZXcuZXh0ZW5kKHtcblx0XHRlbDogJzx1bD48L3VsPicsXG5cdFx0dGVtcGxhdGU6IF8udGVtcGxhdGUoJ1xcXG5cdFx0XHQ8JSBwb3N0cy5lYWNoKGZ1bmN0aW9uKHBvc3QpIHsgJT5cXFxuXHRcdFx0XHQ8bGk+XFxcblx0XHRcdFx0XHQ8YSBocmVmPVwiI1wiPjwlPSBwb3N0LmdldChcInRpdGxlXCIpICU+PC9hPlxcXG5cdFx0XHRcdFx0PCUgaWYgKHBvc3QuZ2V0KFwic3ViYnJlZGRpdFwiKSkgeyAlPlxcXG5cdFx0XHRcdFx0XHQ8c21hbGw+PCU9IHBvc3QuZ2V0KFwic3ViYnJlZGRpdFwiKS5nZXQoXCJuYW1lXCIpICU+PC9zbWFsbD5cXFxuXHRcdFx0XHRcdDwlIH0gJT5cXFxuXHRcdFx0XHQ8L2xpPlxcXG5cdFx0XHQ8JSB9KSAlPlxcXG5cdFx0JyksXG5cblx0XHRpbml0aWFsaXplOiBmdW5jdGlvbigpIHtcblx0XHRcdHRoaXMubGlzdGVuVG8odGhpcy5jb2xsZWN0aW9uLCAndXBkYXRlJywgdGhpcy5yZW5kZXIpO1xuXHRcdH0sXG5cblx0XHRyZW5kZXI6IGZ1bmN0aW9uKCkge1xuXHRcdFx0dGhpcy4kZWwuaHRtbCh0aGlzLnRlbXBsYXRlKHsgcG9zdHM6IHRoaXMuY29sbGVjdGlvbiB9KSk7XG5cdFx0XHRyZXR1cm4gdGhpcztcblx0XHR9XG5cdH0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFBvc3RzTGlzdFZpZXc7IiwidmFyIFN1YmJyZWRkaXRzTGlzdFZpZXcgPSBCYWNrYm9uZS5WaWV3LmV4dGVuZCh7XG5cdFx0ZWw6ICc8dWw+PC91bD4nLFxuXG5cdFx0dGVtcGxhdGU6IF8udGVtcGxhdGUoJ1xcXG5cdFx0XHQ8JSBzdWJicmVkZGl0cy5lYWNoKGZ1bmN0aW9uKHN1YmJyZWRkaXQpIHsgJT5cXFxuXHRcdFx0XHQ8bGk+PGEgZGF0YS1pZD1cIjwlPSBzdWJicmVkZGl0LmlkICU+XCIgaHJlZj1cIiNcIj48JT0gc3ViYnJlZGRpdC5nZXQoXCJuYW1lXCIpICU+PC9hPjwvbGk+XFxcblx0XHRcdDwlIH0pICU+XFxcblx0XHQnKSxcblxuXHRcdGV2ZW50czoge1xuXHRcdFx0J2NsaWNrIGEnOiBmdW5jdGlvbihldmVudCkge1xuXHRcdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0XHR2YXIgc3ViYnJlZGRpdElkID0gJChldmVudC50YXJnZXQpLmRhdGEoJ2lkJyk7XG4gICAgICAgICAgICAgICAgdmFyIFN1YmJyZWRkaXRNb2RlbCA9IHJlcXVpcmUoJy4uL21vZGVscy9TdWJicmVkZGl0TW9kZWwuanMnKVxuXHRcdFx0XHR2YXIgc3ViYnJlZGRpdCA9IG5ldyBTdWJicmVkZGl0TW9kZWwoe2lkOiBzdWJicmVkZGl0SWR9KTtcbiAgICAgICAgICAgICAgICB2YXIgUG9zdHNMaXN0VmlldyA9IHJlcXVpcmUoJy4vUG9zdHNMaXN0Vmlldy5qcycpO1xuXHRcdFx0XHRzdWJicmVkZGl0LmZldGNoKHtcblx0XHRcdFx0XHRzdWNjZXNzOiBmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRcdHZhciBwb3N0c0xpc3RWaWV3ID0gbmV3IFBvc3RzTGlzdFZpZXcoeyBcblx0XHRcdFx0XHRcdFx0Y29sbGVjdGlvbjogc3ViYnJlZGRpdC5nZXQoJ3Bvc3RzJylcblx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdFx0JCgnI3Bvc3RzJykuaHRtbChwb3N0c0xpc3RWaWV3LnJlbmRlcigpLmVsKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXHRcdFx0fVxuXHRcdH0sXG5cblx0XHRpbml0aWFsaXplOiBmdW5jdGlvbigpIHtcblx0XHRcdHRoaXMubGlzdGVuVG8odGhpcy5jb2xsZWN0aW9uLCAndXBkYXRlJywgdGhpcy5yZW5kZXIpO1xuXHRcdH0sXG5cblx0XHRyZW5kZXI6IGZ1bmN0aW9uKCkge1xuXHRcdFx0dGhpcy4kZWwuaHRtbCh0aGlzLnRlbXBsYXRlKHsgc3ViYnJlZGRpdHM6IHRoaXMuY29sbGVjdGlvbiB9KSk7XG5cdFx0XHRyZXR1cm4gdGhpcztcblx0XHR9XG5cdH0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFN1YmJyZWRkaXRzTGlzdFZpZXc7Il19
