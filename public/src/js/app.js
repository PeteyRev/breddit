'use strict';

var $ = window.$ = window.jQuery = require('jquery');
require('foundation');

var HomeView = require('./views/HomeView.js');
var TopNavView = require('./views/TopNavView.js');

$(document).on('ready', function() {
	$(document).foundation();

  $.ajaxSetup({
    headers: {
      'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    }
  });

  var topNavView = new TopNavView();
  $('#nav').html(topNavView.el);
  topNavView.render();

  var homeView = new HomeView();
  $('#content').html(homeView.el);
  homeView.render();

})