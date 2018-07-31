//
var KEY={
	UP:38,
	DOWN:40,
	W:87,
	S:83
};

//
var pingpong={};
pingpong.pressedKeys=[];
//
pingpong.ball={
	speed:5,
	x:150,
	y:100,
	directionX:1,
	directionY:1
};
//
var sc={
	scoreA:0,
	scoreB:0
};
//
$(function(){
	$("#paddleB").css("top",20);
	$("#paddleA").css("top",60);
	//
	pingpong.timer=setInterval(gameloop,30);
	$(document).keydown(
		function(e){
			pingpong.pressedKeys[e.which]=true;
		});
	$(document).keyup(
		function(e){
			pingpong.pressedKeys[e.which]=false;
		});
});

//
function gameloop(){
	moveBall();
	movePaddles();
}

//
function movePaddles(){
	if(pingpong.pressedKeys[KEY.UP]){
		var top=parseInt($("#paddleB").css("top"));
		$("#paddleB").css("top",top-5);
	}
	if(pingpong.pressedKeys[KEY.DOWN]){
		var top=parseInt($("#paddleB").css("top"));
		$("#paddleB").css("top",top+5);
	}
	if(pingpong.pressedKeys[KEY.W]){
		var top=parseInt($("#paddleA").css("top"));
		$("#paddleA").css("top",top-5);
	}
	if(pingpong.pressedKeys[KEY.S]){
		var top=parseInt($("#paddleA").css("top"));
		$("#paddleA").css("top",top+5);
	}
}

//
function moveBall(){
	var playgroundHeight=parseInt($("#playground").height());
	var playgroundWidth=parseInt($("#playground").width());
	var ball=pingpong.ball;
	/*
	//小球到达边界反弹
	if(ball.y+ball.speed*ball.directionY>playgroundHeight){
		ball.directionY=-1;
	}
	if(ball.y+ball.speed*ball.directionY<0){
		ball.directionY=1;
	}
	if(ball.x+ball.speed*ball.directionX>playgroundWidth){
		ball.directionX=-1;
	}
	if(ball.x+ball.speed*ball.directionX<0){
		ball.directionX=1;
	}
	*/
	//检测小球是否出界
	//检测右边界
	if(ball.x+ball.speed*ball.directionX>playgroundWidth){
		//玩家B丢分
		sc.scoreA++;
		$("#scoreA").html(sc.scoreA);
		//重置小球
		ball.x=250;
		ball.y=100;
		$("#ball").css({"left":ball.x,"top":ball.y});
		ball.directionX=-1;
	}
	//检测左边界
	if(ball.x+ball.speed*ball.directionX<0){
		//玩家A丢分
		sc.scoreB++;
		$("#scoreB").html(sc.scoreB);
		//重置小球
		ball.x=150;
		ball.y=100;
		$("#ball").css({"left":ball.x,"top":ball.y});
		ball.directionX=1;
	}
	//检测球拍
	//检测左边球拍
	var paddleAX=parseInt($("#paddleA").css("left"))+parseInt($("#paddleA").css("width"));
	var paddleAYBottom=parseInt($("#paddleA").css("top"))+parseInt($("#paddleA").css("height"));
	var paddleAYTop=parseInt($("#paddleA").css("top"));
	if(ball.x+ball.speed*ball.directionX<paddleAX){
		if(ball.y+ball.speed*ball.directionY<=paddleAYBottom && ball.y+ball.speed*ball.directionY>=paddleAYTop){
			ball.directionX=1;
		}
	}
	//检测右边球拍
	var paddleBX=parseInt($("#paddleB").css("left"))-parseInt($("#ball").css("width"));
	var paddleBYBottom=parseInt($("#paddleB").css("top"))+parseInt($("#paddleB").css("height"));
	var paddleBYTop=parseInt($("#paddleB").css("top"));
	if(ball.x+ball.speed*ball.directionX>paddleBX){
		if(ball.y+ball.speed*ball.directionY<=paddleBYBottom && ball.y+ball.speed*ball.directionY>=paddleBYTop){
			ball.directionX=-1;
		}
	}
	//移动小球
	ball.x+=ball.speed*ball.directionX;
	ball.y+=ball.speed*ball.directionY;
	$("#ball").css({"left":ball.x,"top":ball.y});
}
