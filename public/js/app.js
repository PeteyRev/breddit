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