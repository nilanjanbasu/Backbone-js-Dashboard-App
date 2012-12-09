var app = app || {};

$(function(){
	'use strict';	
	
	app.controlpanel = Backbone.View.extend({
		el:'#control-panel',
		
		events: {
			'blur #ip': 'update',
			'click #save': 'save_model'
		},
		
		initialize:function(){
			
		},
		
		update: function() {
			var v=$('#ip').val().trim();
			app.Dashboard.set({text:v});
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
	
	
	app.appview = Backbone.View.extend({
		
		el: '#dashboard',		
		
		initialize: function() {
			app.Dashboard.on('change',this.render,this);
		},
		
		render: function() {
			//alert("in dashboard");
			this.$('#pass').html('<p>'+app.Dashboard.get('text')+'</p>');
			return this;
		}
		
	});	
	var headerPanel = Backbone.View.extend({
		tagName: 'div',
		template: _.template( $("#sec-template").html()),
		
		initialize: function(){
			//this.model.on();
		}
		
		
		
	});
	
});


