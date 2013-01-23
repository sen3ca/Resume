// basic Backbone setup
(function() {
	window.App = {
		Models: {},
		Collections: {},
		Views: {},
		Router: {}
	};
	
	window.htmlTemplate = function(id) {
		return _.template( $('#'+id).html() );
	};
	
	window.replaceUrlWithArgs = function(url){
		for(var i=1 ; i < arguments.length ; i++) {
			url = url.replace("%"+i, arguments[i]);
		}
		return url;
	};
	
	App.Router = Backbone.Router.extend({
		routes: {
			'': 'index',
			'resume/:id' : 'resume'
		},
		
		index: function() {
			App.resumes = new App.Collections.Resumes;
			App.resumes.fetch().then(function() {
				new App.Views.Resumes({ collection: App.resumes });
			});
			$('#resumePage').hide();
			$('#resumeListPage').show();
		},
		
		resume: function(id) {
			$('#resumeListPage').hide();
			$('#resumePage').show();
			new App.Views.Resume({resumeId:id});
		}
		
	});
	
})(); 