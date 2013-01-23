// Resume list
App.Views.Resumes = Backbone.View.extend({
	el : '#resumes',
	template : htmlTemplate('resumesListTemplate'),
	tagName: '',
	className: 'resumeList',
	id: 'resumeList',
	events : {
		"click .resume": "gotoResume"
	},
	gotoResume : function(e) {
		console.log(e.target.id);
		router.navigate('resume/'+e.target.id, { trigger: true });
	},
	initialize: function() {
		$(this.el).html('');
		this.render();
	},
	render: function() {
		var html="";
		this.collection.each(function(resume){
			html+=this.template(resume.toJSON());
		},this);
		$(this.el).append(html);
		return this;
	}
});

App.Views.Resume = Backbone.View.extend({
	el : '#resume',
	template : 'resumeTemplate',
	initialize : function(obj) {
		this.mission = new App.Models.Mission({resumeId:obj.resumeId});
		this.custom = new App.Models.Custom({resumeId:obj.resumeId});
		this.skills = new App.Collections.Skills({resumeId:obj.resumeId});
		this.jobs = new App.Collections.Jobs({resumeId:obj.resumeId});
		this.render();
	},
	render: function() {
		self=this;
		this.mission.fetch().then(function() {
			new App.Views.Mission({ model: self.mission });
		});
		this.custom.fetch().then(function() {
			new App.Views.Custom({ model: self.custom });
		});
		this.skills.fetch().then(function() {
			new App.Views.Skills({ collection: self.skills });
		});
		this.jobs.fetch().then(function() {
			new App.Views.Jobs({ collection: self.jobs });
		});
	}
		
});

App.Views.Mission = Backbone.View.extend({
	el : '#mission',
	template : htmlTemplate('missionTemplate'),
	initialize: function() {
		$(this.el).html('');
		this.render();
	},
	render: function() {
		var html=this.template(this.model.toJSON()[0]);
		$(this.el).append(html);
		return this;
	}
});

App.Views.Custom = Backbone.View.extend({
	el : '#custom',
	template : htmlTemplate('customTemplate'),
	initialize: function() {
		$(this.el).html('');
		this.render();
	},
	render: function() {
		var html="";
		html+=this.template(this.model.toJSON()[0]);
		$(this.el).append(html);
		return this;
	}
});

App.Views.Skills = Backbone.View.extend({
	el : '#skills',
	template : htmlTemplate('skillsTemplate'),
	initialize: function() {
		this.render();
	},
	render: function() {
		var html="";
		this.collection.each(function(skill){
			html+=this.template(skill.toJSON());
		},this);
		$(this.el).html(html);
		return this;
	}
});

App.Views.Jobs = Backbone.View.extend({
	el : '#jobs',
	template : htmlTemplate('jobsTemplate'),
	initialize: function() {
		this.render();
	},
	render: function() {
		var html="";
		this.collection.each(function(job){
			html+=this.template(job.toJSON());
		},this);
		$(this.el).html(html);
		return this;
	}
});

