var LandingPage = function(){
	this.name = '';
	this.initialize = function() {
		name = $('.name').text().replace(/^\s+|\s+$/g, '');
		var newNameHtml = '';
				
		for ( var i=0 ; i < name.length ; i++ ) {
			newNameHtml+='<span>'+name[i]+'</span>';
		}
		
		$('.name').html(newNameHtml);

		for( var i=0 ; i < name.length ; i++) {
			LandingPage.intervals[i] = setInterval("LandingPage.randomChar("+i+")",70);
		} 

		for( var i=0 ; i < name.length ; i++) {
			setTimeout("LandingPage.clearIntervalResetChar("+i+")", Math.random()*10000%3000);
		}
		
		$('.mainInfo div').fadeIn(3000);
		
		$('#playButton').on('click', function () {
			$('#playButton').animate({height:0}, 500);
			$('#playButton').hide();
			$('.mainInfo').animate({top:0,marginTop:0,height:130}, 1000, function() {
				var pong = new Pong();
				pong.start();
			});
		});
		
		$('#seeResume').on('click', function () {
			location.href='resume.html';
		});
	};
};

LandingPage.intervals = [];

LandingPage.randomizeCharacter = function() {
	return Math.random().toString(36).substr(3,1);
};

LandingPage.randomChar = function(i) {
	if(name[i] != ' ') {
		$('.name span:eq('+i+')').text(LandingPage.randomizeCharacter());
	}
};

LandingPage.clearIntervalResetChar = function(i) {
	clearInterval(LandingPage.intervals[i]);
	$('.name span:eq('+i+')').text(name[i]);
};