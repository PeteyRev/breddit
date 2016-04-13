var Backbone = require('backbone');
var _ = require('underscore');

var PostView = Backbone.View.extend({
	el: '<div class="container"></div>',
	template: _.template('\
		<div class="row">\
			<div class="columns small-12">\
				<h1><%= model.get("title") %></h1>\
			</div>\
		</div>\
	'),

	initialize: function() {
		this.listenTo(this.model, 'change', this.render);
	},

	render: function() {
		this.$el.html(this.template({model: this.model}));
		return this;
	}
});

module.exports = PostView;