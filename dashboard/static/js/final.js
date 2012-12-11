var app = app || {};

$(function() {
	'use strict';
	
	
	app.Dashboard = new app.dashboardModel();
	app.av = new app.appview();
	
	var path = window.location.pathname.slice(1);
	if(path[path.length-1] === '/' )
		path=path.slice(0,path.length-1);
	
	app.Dashboard.url = "/raw_json/"+path;
	app.Dashboard.fetch();
	
});
