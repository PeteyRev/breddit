'use strict';

var $ = window.$ = window.jQuery = require('jquery');

var HomeView = require('./views/HomeView.js');

 $(document).on('ready', function() {

	$.ajaxSetup({
		headers: {
			'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
		}
	});
     
	var homeView = new HomeView();
	$('#content').html(homeView.render().el);

});