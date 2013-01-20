var Pong = function() {
	var canvas = document.getElementById('theCanvas');
	var ctx = canvas.getContext('2d');
	
	adjustCanvas();
	
	var leftPaddle = {
		x : 0,
		y : getCanvasHeight()/2-50,
		velocity:0,
		score : 0
	};

	var rightPaddle = {
		x : getCanvasWidth()-20,
		y : getCanvasHeight()/2-50,
		velocity:0,
		score : 0
	};

	var ball = {
		x : getCanvasWidth()/2,
		y : getCanvasHeight()/2,
		velocity : {
			x : 0,
			y : 0
		}
	};
	
	function adjustCanvas() {
		ctx.canvas.width=$('.mainContainer').width();
		ctx.canvas.height=$('.mainContainer').height();
	};
	
	function getCanvasHeight() {
		return $('#theCanvas').height();
	};

	function getCanvasWidth() {
		return $('#theCanvas').width();
	};
	
	var initialize = function() {
		adjustCanvas();
		
		$(window).on('resize', function() {
			adjustCanvas();
			rightPaddle.x = getCanvasWidth()-20;
			rightPaddle.y = getCanvasHeight()/2-50;
			drawScores();
		});

		$(window).on('keydown', function(e) {
			if(e.which == 69){ //101){ //e
				leftPaddle.velocity = -5;	
			} else if(e.which == 68){ //100){ //d
				leftPaddle.velocity = 5;
			} else if(e.which == 73){ // 105){ //i
				rightPaddle.velocity = -5;
			} else if(e.which == 75){ // 107){ //k
				rightPaddle.velocity = 5;
			}
		});

		$(window).on('keyup', function(e) {
			if(e.which == 69){ //101){ //e
				leftPaddle.velocity = 0;	
			} else if(e.which == 68){ //100){ //d
				leftPaddle.velocity = 0;
			} else if(e.which == 73){ // 105){ //i
				rightPaddle.velocity = 0;
			} else if(e.which == 75){ // 107){ //k
				rightPaddle.velocity = 0;
			}
		});	
		
		$('#playAgain').on('click', function() {
			$('#winner #who, #winner #playAgain').fadeOut(500, function () {
				$('#winner').hide(1000, function() {
					reset();
				});
			});
		});
		
		resetBall();
		createScores();
	};
	
	var resetBall = function(direction) {
		if(arguments.length == 0) {
			if(Math.random()*10 > 4){
				direction = 1;
			} else {
				direction = -1;
			}
		}
		ball.x = getCanvasWidth()/2;
		ball.y = getCanvasHeight()/2;
		ball.velocity.x = 5*direction;
		if(Math.random()*10 > 4){
			ball.velocity.y = 5*1;
		} else {
			ball.velocity.y = 5*-1;
		}
		
		console.log(ball.velocity.x);
		console.log(ball.velocity.y);
	};

	var createScores = function() {
		$('#leftPlayerScore').css('display', 'block');
		$('#rightPlayerScore').css('display', 'block');
		$('#leftPlayerScore, #rightPlayerScore').css('top', '130px');
		drawScores();
	};

	var drawScores = function() {
		$('#leftPlayerScore').css('left', (getCanvasWidth()/2)-150);
		$('#rightPlayerScore').css('right', (getCanvasWidth()/2)-150);
		$('#leftPlayerScore').text(leftPaddle.score);
		$('#rightPlayerScore').text(rightPaddle.score);
	};

	var drawBall = function() {
		if (ball.y > getCanvasHeight() || ball.y < 0) {
			ball.velocity.y = -ball.velocity.y ;
		}

		if (ball.x > getCanvasWidth()) {
			leftPaddle.score++;
			resetBall(1);
		}

		if(ball.x < 0) {
			rightPaddle.score++;
			resetBall(-1);
		}

		if(ball.x < 10 && 
		  !(ball.y < leftPaddle.y || ball.y > leftPaddle.y+100)){
			ball.velocity.x = -ball.velocity.x;
		}

		if(ball.x+10 > getCanvasWidth()-10 && 
		  !(ball.y < rightPaddle.y || ball.y > rightPaddle.y+100)){
			ball.velocity.x = -ball.velocity.x;
		}
		
		ctx.fillStyle = "rgb(255, 255, 255)";
    	ball.y = ball.y+ball.velocity.y;
    	ball.x = ball.x+ball.velocity.x;
    	ctx.fillRect(ball.x, ball.y, 10, 10);
	};
	
    var drawLeftPaddle = function() {
    	ctx.fillStyle = "rgb(255, 255, 255)";
    	leftPaddle.y = leftPaddle.y+leftPaddle.velocity;reset
    	ctx.fillRect(leftPaddle.x, leftPaddle.y, 20, 100);
    };

    var drawRightPaddle = function() {
    	ctx.fillStyle = "rgb(255, 255, 255)";
    	rightPaddle.y = rightPaddle.y+rightPaddle.velocity;
    	ctx.fillRect(rightPaddle.x, rightPaddle.y, 20, 100);
    };
    
    var checkForWinner = function() {
		if(leftPaddle.score >= 7) {
			ball.velocity.x=0;
			$('#winner').show(1000, function() {
				$('#winner #who').text('Left Paddle Wins!');
				$('#winner #who').fadeIn(1000);
				$('#winner #playAgain').fadeIn(1000);
			});
			
		}
		if(rightPaddle.score >= 7) {
			ball.velocity.x=0;
			$('#winner').show(1000, function() {
				$('#winner #who').text('Right Paddle Wins!');
				$('#winner #who').fadeIn(1000);
				$('#winner #playAgain').fadeIn(1000);
			});
			
		}
	};
    
    var gameLoop = function(){
    	ctx.clearRect(0, 0, getCanvasWidth(), getCanvasHeight());
    	drawLeftPaddle();
    	drawRightPaddle();
		
    	if (ball.velocity.x != 0) {
    		drawBall();
    		drawScores();
    		checkForWinner();
    	}
        
		setTimeout(gameLoop, 5);  
	};
    
	var reset = function() {
    	leftPaddle.score = 0;
		rightPaddle.score = 0;
		resetBall();
    };
    
    this.start = function() {
    	initialize();
    	gameLoop();
    };
    
    
};