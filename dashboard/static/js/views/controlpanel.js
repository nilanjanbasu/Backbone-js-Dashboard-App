var app = app || {};

$(function(){
	'use strict';
	
	app.controlpanel = Backbone.View.extend({
		el:'#control-panel',
		
		events: {
			'blur #design-name': 'update_design',
			'blur #color': 'update_color',			
			'blur #ip': 'update',
			'click #save': 'save_model',
			'blur logo-name' : 'update_logo_name'
		},
		
		initialize:function(){
//			app.Dashboard.on('change',this.)
			
		},
		
		render:function(){
			
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
		update_logo_name: function(){
			console.log('Logo name event triggered');
			var v=$("#logo-name").val().trim();
			app.Dashboard.get('headers').set({logo_text:v});
		},
		save_model:function(){
			
			$('.btn').addClass('disabled');
			app.Dashboard.save();
			var d = app.Dashboard.toJSON();
			$.ajax({
				type:"POST",
				url:"/",
				data: d,
				dataType: "json",
				context: this.el,
				success: function(data,textStatus){
					if(data.redirectUrl) {
						window.location.replace(data.redirectUrl);
					}
				},
				error: function(jqxhr,textStatus,error){
					$(this).append("Error:"+jqxhr.statusText);
				}
					
			});
		}
		
	});	
});