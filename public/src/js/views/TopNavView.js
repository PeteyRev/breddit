var Backbone = require('backbone');

var TopNavView = Backbone.View.extend({
	el: '\
	<nav class="top-bar" data-topbar role="navigation">\
	  <ul class="title-area">\
	    <li class="name">\
	      <h1><a href="#">My Breddit</a></h1>\
	    </li>\
	     <!-- Remove the class "menu-icon" to get rid of menu icon. Take out "Menu" to just have icon alone -->\
	    <li class="toggle-topbar menu-icon"><a href="#"><span>Menu</span></a></li>\
	  </ul>\
	  <section class="top-bar-section">\
	    <!-- Right Nav Section -->\
	    <ul class="right">\
	      <li class="active"><a href="/logout">Logout</a></li>\
          <li class="has-dropdown">\
              <a href="#">Subbreddits</a>\
                <ul class="dropdown">\
                  <li><a href="#">All</a></li>\
                  <li class="active"><a href="#">Subscribed</a></li>\
                </ul>\
          </li>\
	    </ul>\
	    <!-- Left Nav Section -->\
	  </section>\
	  </nav>\
	',

	render: function() {
		$(document).foundation('topbar', 'reflow');
	}
});

module.exports = TopNavView;