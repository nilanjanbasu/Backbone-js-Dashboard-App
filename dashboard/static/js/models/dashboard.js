var app = app || {};

$(function(){
	'use strict';
	
	var dashboard = Backbone.Model.extend({
		defaults:{
			text:''
		},
		localStorage: new Store("Dashboard-config")
	});
	app.Dashboard = new dashboard();
	
	app.HeaderFieldModel = Backbone.Model.extend({
		defaults:{
			logoText:''
		}
	});
	
	app.PrimaryFieldModel = Backbone.Model.extend({
		defaults:{
			mainText:'',
			auxText:''
		}
	});
});
