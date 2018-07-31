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

