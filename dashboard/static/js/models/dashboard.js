var app = app || {};

$(function(){
	'use strict';
	
	app.HeaderFieldModel = Backbone.Model.extend({
		defaults:{
			logo_img_url:"",
			use_img: false, // make checked in index.html false 
			logo_text:"Logo Text Here",
			logo_text_x: '0px', //Initialized from app.headerAppView
			logo_text_y: '0px',
			font_size: '0px',
			font_color:'#FFFFFF'
		}
	});
	
	app.PrimaryFieldModel = Backbone.Model.extend({
		
		defaults:{
			offer_field:'',
			item_field:'',
			use_thumbnail:false,
			thumbnail_url:''
		}
		
	});
	
	var dashboard = Backbone.Model.extend({
		defaults:{
			text:'Design Name',
			color:'#FFFFFF', // Standard Wallet Colours: #E27F38; #00934E, #1889D7, #E8AA05
			headers: new app.HeaderFieldModel(),
			primary: new app.PrimaryFieldModel()
		},
		//localStorage: new Store("Dashboard-config")
		
		parse:function(response){
			//this.headers.destroy();
			this.set('headers',new app.HeaderFieldModel(response.headers,{parse:true}));
			delete response.headers;
			
			//this.primary.destroy();
			this.set('primary', new app.PrimaryFieldModel(response.primary,{parse:true}));
			delete response.primary;
			return response;
		}
	});
	app.Dashboard = new dashboard();

});
