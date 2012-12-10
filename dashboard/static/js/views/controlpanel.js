var app = app || {};

$(function(){
	'use strict';
	
	app.headerControlPanel = Backbone.View.extend({
		
		events: {
			'blur #logo-name' : 'update_logo_name',
			'click #checkbox_img': 'toggleImage',
			'click .btn.right': function(){this.shift(2,0);},
			'click .btn.left': function(){this.shift(-2,0);},
			'click .btn.up': function(){this.shift(0,-2);},
			'click .btn.down': function(){this.shift(0,2);},
			'click .btn.fontplus':function(){this.changeFont(2);},
			'click .btn.fontminus': function(){this.changeFont(-2);},
			'click #logo_apply':'updateImage',
			'blur #colorchooser': 'changeFontColor'
		},
		
		initialize:function(){
			
			$('#logo-image').attr('disabled',true);
			$('#logo_apply').addClass("disabled");
		},
		
		changeFontColor: function(){
			console.log("here");
			var clr = $('#colorchooser').val();
			if( clr ) {
				console.log('Colorchooser event, color' + clr.trim());
				this.model.set({font_color:clr.trim()});				
			}
			
		},
		
		updateImage: function(){
			if(this.model.get('use_img')){
				var url = $('#logo-image').val().trim();
				this.model.set({'logo_img_url':url});
			}
		},
		changeFont:function(i){
			console.log("here");
			var size = this.model.get('font_size');
			console.log(size);
			this.model.set('font_size',size+i);
		},
		
		shift: function(delta_left,delta_top){ //+ve x means downwards, and +y means rightwards
			console.log('Triggered btn up/dpwn/left/right');
			if ( delta_top ) {
				var top = this.model.get('logo_text_y') + delta_top;
				this.model.set({logo_text_y:top});
			}
			if ( delta_left ) {
				var left = this.model.get('logo_text_x') + delta_left;				
				this.model.set({logo_text_x:left});
			}
		},
		
		change: function(){
			console.log('Change event');
		},
		update_logo_name: function(){
			console.log('Logo Name on blur event recorded');
			var v=$("#logo-name").val().trim();
			this.model.set({logo_text:v});
		},
		toggleImage: function(){
			$('#logo-image').attr('disabled',function(idx, oldAttr) {
	            return !oldAttr;
			});
			var checked_status = this.model.get('use_img');
			this.model.set({use_img:!checked_status});
			if(!checked_status){
				$('#logo_apply').removeClass("disabled");
			} else {
				$('#logo_apply').addClass("disabled");
			}
			
//			this.trigger('click_check');
			console.log('Fired event click_check');
		}
		
	});
	
	
	app.primaryPanel = Backbone.View.extend({
		
		events: {
			'blur #offer' : 'update_offer',
			'blur #item' : 'update_item',
			'click #checkbox_thumb': 'toggleThumb',
			'click #thumb_apply':'updateThumb',
		},
		initialize:function(){
			$('#thumbnail').attr('disabled',true);
			$('#thumb_apply').addClass("disabled");
		},
		
		update_offer:function(){
			var v=$("#offer").val().trim();
			this.model.set({offer_field:v});
		},
		
		update_item: function(){
			var v=$("#item").val().trim();
			this.model.set({item_field:v});
		},	
		toggleThumb: function() {
			$('#thumbnail').attr('disabled',function(idx, oldAttr) {
	            return !oldAttr;
			});
			var checked_status = this.model.get('use_thumbnail');
			this.model.set({use_thumbnail:!checked_status});
			if(!checked_status){
				$('#thumb_apply').removeClass("disabled");
			} else {
				$('#thumb_apply').addClass("disabled");
			}
		},
		updateThumb: function() {
			if(this.model.get('use_thumbnail')){
				var url = $('#thumbnail').val().trim();
				this.model.set({'thumbnail_url':url});
			}
		}
		
	});
	
	app.controlpanel = Backbone.View.extend({
		el:'#control-panel',
		
		events: {
			'blur #design-name': 'update_design',
			'blur #color': 'update_color',			
			'blur #ip': 'update',
			'click #save': 'save_model'
		},
		
		initialize:function(){
			this.headerController = new app.headerControlPanel({el:$('#header_controls'),model:app.Dashboard.get('headers')});
			this.primaryController = new app.primaryPanel({el:$('#primary_controls'),model:app.Dashboard.get('primary')});
			
			app.Dashboard.on('Fetch_server',this.hide_panel,this);
		},
		
		render:function(){
			
		},
		
		hide_panel: function(){
			console.log('Hide panel in control panel');
		},
		
		update_generic: function(selector,attribute) {
			var v=$(selector).val().trim();
			app.Dashboard.set({attribute:v});
		},
		update: function(){
			this.update_generic('#ip','ip_test');
		},
		update_design: function(){
			var v=$("#design-name").val().trim();
			app.Dashboard.set({text:v});
		},
		update_color: function(){
			console.log('Color event triggered');
			var v=$("#color").val().trim();
			app.Dashboard.set({color:v});
		},
		
		save_model:function(){
			
			$('#save').addClass('disabled');
			var d = JSON.stringify(app.Dashboard.toJSON());
			$.ajax({
				type:"POST",
				url:"/",
				data: d,
				dataType: "json",
				context: this.el,
				success: function(data,textStatus){
					if(data.redirectUrl) {
						//alert(app.Dashboard.url);
						app.Router.navigate(data.redirectUrl,{trigger:true});
						//window.location.replace(data.redirectUrl);
					}
				},
				error: function(jqxhr,textStatus,error){
					$(this).append("Error:"+jqxhr.statusText);
				}
					
			});
		}
		
	});	
});