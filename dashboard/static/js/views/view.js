var app = app || {};

$(function(){
	'use strict';	
	
	app.headerAppView = Backbone.View.extend({
	
		initialize:function(){
			this.model.on('change:use_img',this.toggleChecked,this);
			this.model.on('change:logo_text',this.changeLogoText,this);			
			this.model.on('change:logo_text_x',this.changeH4Left,this);
			this.model.on('change:logo_text_y',this.changeH4Top,this);
			this.model.on('change:font_size',this.changeFont,this);
			this.model.on('change:logo_img_url',this.changeImage,this);
			this.model.on('change:font_color',this.changeFontColor,this);
			
			var top = parseInt($('#headers > h4').css('top'));
			var left = parseInt($('#headers > h4').css('left'));
			var sz = parseInt($('#headers > h4').css('font-size'));
			this.model.set({logo_text_x:left,logo_text_y:top,font_size:sz,logo_img_url:"" ,font_color:'#FFFFFF'});
		},
		
		
		changeImage: function(){
			$("#logo").attr({'src':this.model.get('logo_img_url')}).show();
		},
		
		changeFont: function(){
			$("h4").css({'font-size':this.model.get('font_size')});			
		},
		
		changeFontColor: function(){
			console.log("Here");
			$("h4").css('color',this.model.get('font_color'));			
		},
		
		changeH4Left:function(){
			$("h4").css({'left':this.model.get('logo_text_x')});
		},
		changeH4Top:function(){
			$("h4").css({'top':this.model.get('logo_text_y')});
		},
		
		changeLogoText: function(){
			$('h4').text(this.model.get('logo_text'));
//			return this;
		},
		toggleChecked: function(){
			var status = this.model.get('use_img');
			if(status)
				$('#logo').fadeIn();
			else
				$('#logo').fadeOut();
		}
	
		
	});	
	
	app.primaryAppView = Backbone.View.extend({
		
		initialize:function(){
			
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


