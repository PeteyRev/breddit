var Backbone = require('backbone');
var _ = require('underscore');
var SubbredditModel = require('../models/SubbredditModel.js')

var SubbredditModalView = Backbone.View.extend({
el:'<div></div>',

    template:_.template('\
        <h3>Add a Subbreddit</h3>\
        <form>\
            <input type="text" name="name">\
            <textarea name="description"></textarea>\
            <input type="submit" value="Submit">\
        </form>\
    '),

    events: {
		'submit form': function(event) {
			var that = this;
			event.preventDefault();
			var subbreddit = new SubbredditModel({
				name: $(event.target).find('[name="name"]').val(),
				description: $(event.target).find('[name="description"]').val()
			});
			subbreddit.save(null, {
				success: function() {
					that.collection.add(subbreddit);
					$('#modal').foundation('reveal', 'close');
				}
			});
		}
	},

    render: function() {
        this.$el.html(this.template());
        return this;
    }
});

module.exports = SubbredditModalView;