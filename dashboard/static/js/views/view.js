var app = app || {};

$(function(){
	'use strict';	
	
	app.headerpanel = Backbone.View.extend({
		initialize:function(){
			this.model.on('change:logo_img_url',this.changeLogo,this); //bind the events
			this.model.on('change:logo_text',this.changeLogoText,this);
		},
		
		changeLogo:function(){
			
			//TODO
		},
		changeLogoText: function(){
			$('h4').text(this.model.get('logo_text'));
			return this;
		}
	
		
	});	
	
	app.appview = Backbone.View.extend({
		
		el: '#dashboard',		
		
		initialize: function() {
			app.Dashboard.on('change',this.subrender,this);
			this.header_view = new app.headerpanel({el:$("#headers"),model:app.Dashboard.get('headers')}); ////
		},
		
		subrender: function() {//			
			console.log('Color event in view');
			this.$('#nameofdesign').text(app.Dashboard.get('text'));
			this.$('#pass').css({'background-color':app.Dashboard.get('color')});
			return this;
		}
		
	});	
//	var headerPanel = Backbone.View.extend({
//		tagName: 'div',
//		template: _.template( $("#sec-template").html()),
//		
//		initialize: function(){
//			//this.model.on();
//		}
		
		
			
});


