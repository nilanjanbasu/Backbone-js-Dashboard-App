var app = app || {};

$(function(){
	'use strict';
	
	app.HeaderFieldModel = Backbone.Model.extend({
		defaults:{
			logo_img_url:"",
			use_img: false, // make checked in index.html false 
			logo_text:"Logo Text Here",
			logo_text_x: 0, //Initialized from app.headerAppView
			logo_text_y:0
		}
	});
	
	var dashboard = Backbone.Model.extend({
		defaults:{
			text:'Design Name',
			color:'#FFFFFF', // Standard Wallet Colours: #E27F38; #00934E, #1889D7, #E8AA05
			headers: new app.HeaderFieldModel()
		},
		localStorage: new Store("Dashboard-config")
	});
	app.Dashboard = new dashboard();

	
//	app.PrimaryFieldModel = Backbone.Model.extend({
//		defaults:{
//			mainText:'',
//			auxText:''
//		}
//	});
});
