var app = app || {};

(function() {
	'use strict';
	
	var workspace = Backbone.Router.extend({
		
		routes:{			
			"saved/:page" : 'fetch_from_server'
		},
		
		fetch_from_server: function(page){
			app.Dashboard.trigger('Fetch_server');
			this.navigate('saved/'+page);
		}
		
	});
	app.Router = new workspace();
	Backbone.history.start();
	
}());