// Resume list
App.Views.Resumes = Backbone.View.extend({
	el : '#resumes',
	template : htmlTemplate('resumesListTemplate'),
	tagName: '',
	className: 'resumeList',
	id: 'resumeList',
	events : {
		"click .resume": "gotoResume",
		"mouseover .resume": "growResume",
		"mouseleave .resume": "shrinkResume"
	},
	getCorrectElementFromTarget : function(e) {
		if(e.target.id) {
			return e.target;
		} else {
			return $(e.target).parent()[0];
		}
		
	},
	gotoResume : function(e) {
		if(e.target.id) {
			router.navigate('resume/'+this.getCorrectElementFromTarget(e).id, { trigger: true });
		} else {
			router.navigate('resume/'+this.getCorrectElementFromTarget(e).id, { trigger: true });
		}
	},
	growResume : function(e) {
		$(this.getCorrectElementFromTarget(e)).animate({'width':'100%'});
		$(this.getCorrectElementFromTarget(e)).children('.additional').fadeIn();
	},
	shrinkResume : function(e) {
		$(this.getCorrectElementFromTarget(e)).animate({'width':'100px',"display":"none"});
		$(this.getCorrectElementFromTarget(e)).children('.additional').fadeOut();
	},
	initialize: function() {
		$('#createResume').on('mouseover', function(){$('#createResume').animate({'width':'100%'})});
		$('#createResume').on('mouseleave', function(){$('#createResume').animate({'width':'100px'})});
		$('#createResume').on('click', function() {
			location.href='testPage.html';
		});
		this.render();
	},
	render: function() {
		var html="";
		this.collection.each(function(resume){
			html+=this.template(resume.toJSON());
		},this);
		$(this.el).html(html);
		return this;
	}
});

App.Views.Resume = Backbone.View.extend({
	el : '#resume',
	template : htmlTemplate('resumeHeaderTemplate'),
	initialize : function(obj) {
		this.resume = new App.Models.Resume({id:obj.resumeId});
		this.mission = new App.Models.Mission({resumeId:obj.resumeId});
		this.custom = new App.Models.Custom({resumeId:obj.resumeId});
		this.skills = new App.Collections.Skills({resumeId:obj.resumeId});
		this.jobs = new App.Collections.Jobs({resumeId:obj.resumeId});
		this.education = new App.Collections.Education({resumeId:obj.resumeId});
		this.render();
	},
	render: function() {
		var self=this;
		
		this.resume.fetch().then(function() {
			var html=self.template(self.resume.toJSON()[0]);
			$(self.el).html(html);
		});
		
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
		this.education.fetch().then(function() {
			new App.Views.Education({ collection: self.education });
		});
		return this;
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
		$(this.el).html(html);
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

App.Views.Education = Backbone.View.extend({
	el : '#education',
	template : htmlTemplate('educationTemplate'),
	initialize: function() {
		this.render();
	},
	render: function() {
		var html="";
		this.collection.each(function(education){
			html+=this.template(education.toJSON());
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

