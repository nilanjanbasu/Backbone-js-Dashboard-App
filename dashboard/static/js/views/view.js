var app = app || {};

$(function(){
	'use strict';	
	
	app.headerAppView = Backbone.View.extend({
	
		initialize:function(){
			this.model.on('change:use_img',this.toggleChecked,this);
			this.model.on('change:logo_img_url',this.changeLogo,this); //bind the events
			this.model.on('change:logo_text',this.changeLogoText,this);			
			this.model.on('change:logo_text_x',this.changeH4Left,this);
			this.model.on('change:logo_text_y',this.changeH4Top,this);
			
			var top = parseInt($('#headers > h4').css('top'));
			var left = parseInt($('#headers > h4').css('left'));
			this.model.set({logo_text_x:left,logo_text_y:top });
		},
		
		
		changeH4Left:function(){
			$("#headers > h4").css({'left':this.model.get('logo_text_x')})
		},
		changeH4Top:function(){
			$("#headers > h4").css({'top':this.model.get('logo_text_y')});
		},
		
		changeLogo:function(){
			
			//TODO
		},
		changeLogoText: function(){
			$('h4').text(this.model.get('logo_text'));
//			return this;
		},
		toggleChecked: function(){
			var status = this.model.get('use_img');
			if(status)
				$('img').fadeIn();
			else
				$('img').fadeOut();
		}
	
		
	});	
	
	app.appview = Backbone.View.extend({
		
		el: '#dashboard',		
		
		initialize: function() {
			app.Dashboard.on('change',this.subrender,this);
			this.header_view = new app.headerAppView({el:$("#headers"),model:app.Dashboard.get('headers')}); ////
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


