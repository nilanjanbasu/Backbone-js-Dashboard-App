var app = app || {};
var ENTER_KEY = 13;

$(function() {
	'use strict';
	// Kick things off by creating the **App**.
	app.Dashboard = new app.dashboardModel();
	app.Router = new app.workspace();
	Backbone.history.start();
	
	app.cp = new app.controlpanel();
	app.av = new app.appview();
	
});
