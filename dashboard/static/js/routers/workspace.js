var app = app || {};

(function() {
	'use strict';
	
	app.workspace = Backbone.Router.extend({
		
		routes:{			
			"saved/:page" : 'fetch_from_server'
		},
		
		fetch_from_server: function(page){
			app.Dashboard.trigger('Fetch_server');
			this.navigate('saved/'+page);
		}
		
	});
	
}());