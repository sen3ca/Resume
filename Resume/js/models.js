App.Models.Resume = Backbone.Model.extend({
	urlRoot : 'rest/resume/'
});

App.Models.Mission = Backbone.Model.extend({
	initialize : function(obj) {
		this.url = replaceUrlWithArgs(this.url,obj.resumeId);
	},
	url : 'rest/resume/%1/mission'
});

App.Models.Custom = Backbone.Model.extend({
	initialize : function(obj) {
		this.url = replaceUrlWithArgs(this.url,obj.resumeId);
	},
	url : 'rest/resume/%1/custom'
});

App.Models.Skill = Backbone.Model.extend({});
App.Models.Job = Backbone.Model.extend({});
