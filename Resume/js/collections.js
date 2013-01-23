App.Collections.Resumes = Backbone.Collection.extend({
	model: App.Models.Resume,
	url: 'rest/resume'
});

App.Collections.Skills = Backbone.Collection.extend({
	initialize : function(obj) {
		this.url = replaceUrlWithArgs(this.url,obj.resumeId);
	},
	model: App.Models.Skill,
	url: 'rest/resume/%1/skills'
});

App.Collections.Jobs = Backbone.Collection.extend({
	initialize : function(obj) {
		this.url = replaceUrlWithArgs(this.url,obj.resumeId);
	},
	model: App.Models.Skill,
	url: 'rest/resume/%1/jobs'
});



