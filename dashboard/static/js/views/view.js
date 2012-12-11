var app = app || {};

$(function(){
	'use strict';	
	
	app.headerAppView = Backbone.View.extend({
	
		initialize:function(){
			
			this.bind_all_model_events();
			
			var top = parseInt($('#headers > h4').css('top'));
			var left = parseInt($('#headers > h4').css('left'));
			var sz = parseInt($('#headers > h4').css('font-size'));
			this.model.set({logo_text_x:String(left),logo_text_y:String(top),font_size:String(sz),logo_img_url:"" ,font_color:'#FFFFFF'});
		},
		
		set_model: function(m){
			this.model = m;
			this.bind_all_model_events();
			this.render('render_all');
		},
		
		bind_all_model_events: function(){
			this.model.on('change:use_img',this.toggleChecked,this);
			this.model.on('change:logo_text',this.changeLogoText,this);			
			this.model.on('change:logo_text_x',this.changeH4Left,this);
			this.model.on('change:logo_text_y',this.changeH4Top,this);
			this.model.on('change:font_size',this.changeFont,this);
			this.model.on('change:logo_img_url',this.changeImage,this);
			this.model.on('change:font_color',this.changeFontColor,this);
			this.on('render_all',this.render,this);			
		},		
		render: function(){ //Using a template is not advantageous as there are large number of css attribs
			this.changeImage();
			this.changeFont();
			this.changeFontColor();
			this.changeH4Left();
			this.changeH4Top();
			this.changeLogoText();
			this.toggleChecked();
		},
		
		changeImage: function(){
			$("#logo").attr({'src':this.model.get('logo_img_url')});
		},
		
		changeFont: function(){
			$("h4").css({'font-size':parseInt(this.model.get('font_size'))});			
		},
		
		changeFontColor: function(){
			console.log("Here");
			$("h4").css('color',this.model.get('font_color'));			
		},
		
		changeH4Left:function(){
			$("h4").css({'left':parseInt(this.model.get('logo_text_x'))});
		},
		changeH4Top:function(){
			console.log('changing top'+this.model.get('logo_text_y'));
			$("h4").css({'top':parseInt(this.model.get('logo_text_y'))});
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
		
		template: _.template( $('#thumb_template').html()),
		
		initialize:function(){		
			this.model.on('change:use_thumbnail',this.toggleChecked,this);
			this.model.on('change:thumbnail_url',this.makeThumbVisible,this);
			this.model.on('change:offer_field',this.updateOfferField,this);
			this.model.on('change:item_field',this.updateItemField,this);
			this.on('render_all',this.render,this);
		},
		
		render: function(){
			this.updateOfferField();
			this.updateItemField();
			this.makeThumbVisible();
			this.toggleChecked();
		},
		updateItemField: function() {
			$('#only_text p').text(this.model.get('item_field'));
		},
		
		updateOfferField: function(){
			$('#only_text h3').text(this.model.get('offer_field'));			
		},
		
		
		makeThumbVisible: function(){
			$("#thumbnail_view").attr({'src':this.model.get('thumbnail_url')});
		},
		
		toggleChecked: function(){
			var status = this.model.get('use_thumbnail');
			if(status) {
				var url = this.model.get('thumbnail_url');
				this.$el.append(this.template({thumbnail:url}));
				this.$('#only_text').addClass('sidepane').css({'width':'auto'});
				this.$('#only_text h3').css({'font-size':'50px'});
				$('#thumbnail_view').fadeIn();
			} else {
				$('#thumbnail_view').fadeOut().remove();
				this.$('#only_text').removeClass('sidepane').css('width','100%');
				this.$('#only_text h3').css({'font-size':'70px'});
			}
		}
	});
	
	app.appview = Backbone.View.extend({
		
		el: '#dashboard',		
		
		initialize: function() {
			app.Dashboard.on('change:primary',this.change_primary_view,this);
			app.Dashboard.on('change:headers',this.change_header_view,this);
			app.Dashboard.on('change:text',this.subrender,this);
			app.Dashboard.on('change:color',this.subrender,this);
			app.Dashboard.on('Fetch_server',this.fetch_server,this);
			this.header_view = new app.headerAppView({el:$("#headers"),model:app.Dashboard.get('headers')}); ////
			this.primary_view = new app.primaryAppView({el:$("#primary"),model:app.Dashboard.get('primary')}); ////
		},
		
		fetch_server:function(){
			console.log('Fetch server in app view');
		},
		
		change_header_view:function(){
//			this.header_view.remove();
//			this.header_view = new app.headerAppView({el:$("#headers"),model:app.Dashboard.get('headers')}); ////
//			this.$el.prepend(this.header_view.$el);
			this.header_view.set_model(app.Dashboard.get('headers'));
		},
		change_primary_view:function(){
//			this.primary_view.remove();
//			this.primary_view = new app.primaryAppView({el:$("#primary"),model:app.Dashboard.get('primary')}); ////
			this.primary_view.model = app.Dashboard.get('primary');
			this.primary_view.trigger('render_all');
		},
		subrender: function() {//			
			console.log('Color event in view');
			this.$('#nameofdesign').text(app.Dashboard.get('text'));
			this.$('#pass').css({'background-color':app.Dashboard.get('color')});
			return this;
		}
		
	});				
});


