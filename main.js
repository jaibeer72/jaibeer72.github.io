// JavaScript Document
//this is where the main loop will be 

//----------------------------------
//Variables-------------------------
//----------------------------------

var canvas,ctx;
var inputStates = {};
var player={
	x:250,
	y:625,
	w:50,
	h:50,
	vx:5,
	vy:5,
};
//var loc;
var DVr=3;
var gameState=0;
//okay More Variables
var LEND_X;
var LEND_Y;
var MaxDrawDistLine=350;
var Planet={	
	active:false,
	x:50,
	y:-200,
	d:123,
	vy:1,
	vx:1,
	R_Min:{x:0,y:0},
	R_Max:{x:400,y:184},
	sp:{rad:116/2,x:0,y:0},//d1-d2=dxof the inner circle center ramdomize
};
var no=3;
var PlanetArr=[];
var SmallerArr=new Array(4);
for (var i = 0; i < 10; i++) {
  SmallerArr[i] = new Array(4);
}
var j=0;
var AIplanet={
	x:50,
	y:-200,
	d:45,
	vy:1,
	vx:5,
};
var AIArr=[];
var distanceTraveled=0;
var link = document.createElement('link');
link.rel = 'stylesheet';
link.type = 'text/css';
link.href = 'https://fonts.googleapis.com/css?family=Fascinate+Inline|Open+Sans+Condensed:300"';
var imageObj ;//new Image();


document.getElementsByTagName('head')[0].appendChild(link);
//------------------------------
//Mouse Event				----
//------------------------------
function mouseEventManager(evt){
		var rect=canvas.getBoundingClientRect(); 
		var root=document.documentElement; 
		var mouseX=evt.clientX-rect.left-root.scrollLeft; 
		var mouseY=evt.clientY-rect.top-root.scrollTop;
		return{
			x:mouseX,y:mouseY
		}; 
	}
//-------------------------
//Initialisation Functio	
//-------------------------
window.onload=function inital(){
	canvas=document.querySelector('canvas');
	ctx=canvas.getContext('2d'); 
	imageObj= document.getElementById('r');
	//The Looper
	createPlanet(3);
	createAI(3);
	setInterval(function init(){
		GameLoop();
		EventListeners();
	},1000/60);
}

//--------------------------------
// Game Loop Function
//----------------------------------
//Please make sure to give player.x and y

function GameLoop(){
	// more Variables Just dont Ask I do not like JS
	//var lineEnd
	//Creating White BG
	//ClearBG();
	var rain=new BGRain();
	rain.move();
	rain.draw();
	ctx.globalCompositeOperation = "source-over";
	//Lets reduce the opacity of the BG paint to give the final touch
	ctx.fillStyle = "rgba(0, 0, 0, 0.3)";
	ctx.fillRect(0,0,canvas.width,canvas.height);
	switch(gameState)
		{
			case 0:{
				distanceTraveled=0;
				
				//ctx.fillStyle="black";
				//ctx.fillRect(0,0,canvas.width,canvas.height)
				//var image = new Image;
				//image.src = link.href;
				//image.onerror = function() {
				ctx.fillStyle="white";
    			ctx.font = '50px Fascinate Inline';
    			ctx.textBaseline = 'top';
    			ctx.fillText('Spacebound', 20, 10);	
				ctx.font = '40px Fascinate Inline';
				ctx.fillText("MainMenu", 20, 100);
				ctx.font = '25px Open Sans Condensed';
                ctx.fillText("Press SPACE to start", 20, 200);
                ctx.fillText("click and hold to move planets", 20, 250);
                ctx.fillText("and move avoid the wormhole", 20, 300);
				ctx.fillStyle="#f68e56";
				ctx.beginPath();		
    			ctx.arc(375,250,Planet.d/2, 0, 2*Math.PI,true);
    			ctx.fill();
				ctx.fillText("use their gravity to roam ", 290, 325);
				ctx.fillText("throgh space ", 325, 350);
				var c=AIrandomeColor();
		var gradient = ctx.createRadialGradient(380, 420, 0, 380, 420, AIplanet.d/2);
		gradient.addColorStop(0, "white");
		gradient.addColorStop(0.4, "white");
		gradient.addColorStop(0.4, c);
		gradient.addColorStop(1, "black");
    	ctx.fillStyle=gradient;
	ctx.beginPath();		
    ctx.arc(380,420,AIplanet.d/2, 0, 2*Math.PI,true);
    ctx.fill();
				ctx.fillStyle=c;
				ctx.fillText("avoid At all costs", 290, 425);
				if(inputStates.space===true)
					{
						gameState=1;
						ClearBG();
					}
				break;
			}
			case 1:{
				//ctx.fillStyle="#111111";
				
				//Lets blend the particle with the BG
	//ctx.globalCompositeOperation = "lighter";
				//Drawing Player
	for(var i=0;i<no;i++){
		var PlanIT=PlanetArr[i];
		var AITHING=AIArr[i];
		AITHING.move();
		AITHING.colision();
		PlanIT.move();
		if(inputStates.mousedown)
			{
				PlanIT.colision();
			}
		PlanIT.MovePlayerWithPlanet();
		PlanIT.draw();
		AITHING.draw();
		for(var j=0;j<4;j++){
				var p=SmallerArr[i][j];
				p.drawSML();
			//	p.move();
				}
	}
				
	//canvas.addEventListener('keydown',)
	DrawPath(LEND_X,LEND_Y);
	Draw_Player(player.x,player.y);
	//DrawPlanet();
	displayScore();
				break;
			}
			case 2:{
			//	ctx.globalCompositeOperation = "source-over";
//	//Lets reduce the opacity of the BG paint to give the final touch
//	ctx.fillStyle = "rgba(0, 0, 0, 0.3)";
				//ctx.fillStyle="black";
				ctx.fillRect(0,0,canvas.width,canvas.height)
				//var image = new Image;
				//image.src = link.href;
				//image.onerror = function() {
				ctx.fillStyle="white";
    			ctx.font = '50px Fascinate Inline';
    			ctx.textBaseline = 'top';
    			ctx.fillText('Spacebound', 20, 10);	
				ctx.font = '40px Fascinate Inline';
				ctx.fillStyle="red";
				ctx.fillText("GAMEOVER!", 20, 100);
				ctx.fillStyle="white";
				ctx.font = '25px Open Sans Condensed';
                ctx.fillText("Press SPACE to re-start", 20, 200);
                ctx.fillText("use mouse to target planets", 20, 250);
                ctx.fillText("and move avoid the Astroids", 20, 300);
				ctx.fillStyle="Green";
				ctx.fillText("Your Score",20,350);
				ctx.fillText(distanceTraveled,50,400);
				if(inputStates.space==true)
					{ 
						createPlanet(3);
						createAI(3);
						player.x=250;
						player.y=625;
						distanceTraveled=0;
						gameState=1;
					}
				break;
			}
			default:{
				console.log("Error MainLoop");	
			}
		}
	
	
	
}

//---------------------------
//Clear canvas function---
//--------------------------

/*function ClearBG(){
	//ctx.fillStyle="white";
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	//console.log("reaches ClearBG");
}*/
//----------------
//Player Functions
//-----------------
function Draw_Player(x,y){
	var dx=LEND_X-(player.x+player.w/2);
	var dy=LEND_Y-(player.y+player.h/2);
	var angle=Math.atan2(dy,dx);
	//console.log(angle);
	//ctx.save();
	//ctx.fillStyle="blue";
	//ctx.translate(player.x, player.y);
	
	//ctx.fillRect(-(player.w/2),-(player.h/2),player.w,player.h);
	 //imageObj.onload = function() {
		 ctx.save();
		 ctx.translate(player.x, player.y);
		 ctx.rotate(angle+(90*Math.PI/180));
        ctx.drawImage(imageObj,0,0,50,50,-(player.w/2),-(player.h/2),player.w,player.h);
		 ctx.restore();
		 console.log("Is drawing");
    //  };
	//ctx.restore();
}


							
function movePlayer(x,y){
		var dx=x-(player.x+player.w/2);
		var dy=y-(player.y+player.h/2);
		var angle = Math.atan2(dy, dx);
		player.vx = Math.cos(angle) * 5.0;
		player.vy = Math.sin(angle) * 5.0;
		player.x+=player.vx;
		player.y+=player.vy;
		distanceTraveled+=player.y;
	if(player.x>canvas.width||player.x<0||player.y>canvas.height||player.y<0){
					gameState=2;
				}
		//distanceTraveled=distanceTraveled/100;
	  Math.floor(distanceTraveled);
}

//--------------------------
//Randomely Draws Asteroids
//-------------------------

/*function DrawPlanet(x,y,d/2,min,max,FILL){
	//Planet BG
	ctx.fillStyle="#f68e56";
	ctx.beginPath(); 
	ctx.arc(x,y,123/2,0,Math.PI*2,true);
	ctx.fill();
	//planet Front
	ctx.fillStyle="#d33737";
	ctx.beginPath(); 
	ctx.arc(x,y,115/2,0,Math.PI*2,true);
	ctx.fill();
	
}*/
function createPlanet(No){
	for(var i=0;i<No;i++)
		{
			var Sign=RandSign();
			var xo=planetRandomizer();
			var PLan=new updatePlanet(xo,Planet.y+(i*Planet.d*2.3),Planet.vx,Planet.vy,Planet.d,Sign.x,Sign.y);
			PlanetArr[i]=PLan;
			for(var j=0;j<4;j++){
				var A=RandInArea(xo,Planet.y+(i*Planet.d*2.3),Planet.d/2);
				var Small=new DrawSmallerPlanet(A.x,A.y,A.r);
				SmallerArr[i][j]=Small;
				
			}
			
		}
}
function RandSign(){
	var ch =Math.floor(Math.random()*8);
	switch(ch)
		{
			case 0: return{x:+DVr, y:+DVr};
			case 1: return{x:-DVr, y:-DVr};
			case 2: return{x:+DVr, y:-DVr};
			case 3: return{x:-DVr, y:+DVr};
			case 4: return{x:+DVr, y:0};
			case 5: return{x:-DVr, y:0};
			case 6: return{x:0, y:+DVr};
			case 7: return{x:0, y:-DVr};
			default:console.log("error in Case Switch 251");
		}
}

function RandInArea(x,y,r){
	var xx=x-r;
	var yy=y-r;
	var XX=x+r;
	var YY=y+r;
	var Xx=Math.floor(Math.random()*(XX-xx)+xx);
	var Yy=Math.floor(Math.random()*(YY-yy)+yy);
	var Rr=Math.floor(Math.random()*(18-7.5)+(7.5));
	return {x:Xx,y:Yy,r:Rr};
}

function updatePlanet(x,y,vx,vy,d,sx,sy){
	this.x=x;
	this.y=y;
	this.vx=vx;
	this.vy=vy;
	this.rad=d/2;
	this.active=true;
	this.sx=sx;
	this.sy=sy;
	//loc=RandInArea(this.x,this.y,this.rad);
	//console.log("X and y of the planets"+x+"y"+y);
	
	this.draw = function() {
    //Big Planet
	ctx.fillStyle="#f68e56";
	ctx.beginPath();		
    ctx.arc(this.x, this.y, this.rad, 0, 2*Math.PI,true);
    ctx.fill();
		
	//Small Planet
	ctx.fillStyle="#d33737";
	ctx.beginPath();
	ctx.arc(this.x+this.sx,this.y+this.sy,Planet.sp.rad,0,2*Math.PI,true);
	ctx.fill();
	
	//Draw Smaller 
		for(var j=0;j<4;j++){
			/*var SML= new DrawSmallerPlanet(A.x,A.y,A.r);
			SmallerArr[i][j]=SML;*/
			var A=RandInArea(this.x,this.y,this.d/2);
			ctx.fillStyle="#f68e56";
			ctx.beginPath();		
    		ctx.arc(A.x,A.y,A.r, 0, 2*Math.PI,true);
    		ctx.fill();
	}
	
  };
  
  this.move = function() {
    //this.x += this.vx;
	 if(this.y>canvas.height+Planet.d*2.3){
		 var Sign=RandSign();
		 var xo=planetRandomizer();
		 var A=RandInArea(xo,Planet.y,Planet.d/2);
		  PlanetArr[2]=PlanetArr[1];
		  PlanetArr[1]=PlanetArr[0];
		  PlanetArr[0]=new updatePlanet(xo,Planet.y+(Planet.d*2),Planet.vx,Planet.vy,Planet.d,Sign.x,Sign.y);
		 this.y += this.vy;
		 this.yy+=this.vy;
		 for(j=0;j<4;j++){ 
		 SmallerArr[2][j]=SmallerArr[1][j];
		 SmallerArr[1][j]=SmallerArr[0][j];
		 SmallerArr[0][j]=new DrawSmallerPlanet(A.x,A.y,A.r);
		 }
	 }
    else{
	  this.y += this.vy;
		 this.yy+=this.vy;
	}
  };
	this.colision=function(){
		var LineEnd=MathClampToR(LEND_X,LEND_Y);
		var dx=this.x-LineEnd.x;
		var dy=this.y-LineEnd.y;
		if((dx * dx + dy * dy)<(this.rad*this.rad)){
			//console.log("collision");
			//this.vy=0;
			movePlayer(LineEnd.x,LineEnd.y);
			
			}
		};
	this.MovePlayerWithPlanet=function(){
		var dx=this.x-player.x;
		var dy=this.y-player.y;
		if((dx * dx + dy * dy)<(this.rad*this.rad)){
			//player.x+=Planet.vx;
			player.y+=Planet.vy;
		}
	};
}
function DrawSmallerPlanet(xx,yy,rr){
	this.xx=xx;
	this.yy=yy;
	this.rr=rr;
	//return{x:xx,y:yy,r:rr};
	this.drawSML=function(){
    //Big Planet
	//console.log("is reaching draw");
	ctx.fillStyle="#f68e56";
	ctx.beginPath();		
    ctx.arc(this.xx,this.yy,this.rr, 0, 2*Math.PI,true);
    ctx.fill();
	
	this.yy+=Planet.vy;
	//console.log(yy);
	};
	this.move=function(){
		this.yy+=Planet.vy;
	};
}

//-----------------------------
//Planet Randomizer      ------
//-----------------------------
function planetRandomizer(){
	var PX=Math.random()*((500-Planet.d) - Planet.d) + Planet.d;
	//PlanetArr.push=new //updatePlanet(PX,Planet.y,Planet.vx,Planet.vy,Planet.d);
	//alert("check If error");
	return PX;
}


//-----------------------
//Path Creator
//-----------------------
function DrawPath(LEnd_X,LEnd_Y){
var LineEnd=MathClampToR(LEnd_X,LEnd_Y);
ctx.strokeStyle="white";
ctx.beginPath();
ctx.setLineDash([5, 15]);
ctx.moveTo(player.x,player.y);
ctx.lineTo(LineEnd.x,LineEnd.y);
ctx.stroke();
//console.log("Xcoord "+ LEnd_X+"Ycoord "+LEnd_Y);
//ctx.beginPath();
//ctx.setLineDash([]);
//ctx.moveTo(0, 150);
//ctx.lineTo(400, 150);
//ctx.stroke();	
}

//-------------------------
//Manageing AI
//-------------------------
function updateAI(x,y,vx,vy,d){
	this.x=x;
	this.y=y;
	this.vx=vx;
	this.vy=vy;
	this.rad=d/2;
	this.active=true;
	//console.log("X and y of the planets"+x+"y"+y);
	
	this.draw = function() {
	var c=AIrandomeColor();
		var gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.rad);
		gradient.addColorStop(0, "white");
		gradient.addColorStop(0.4, "white");
		gradient.addColorStop(0.4, c);
		gradient.addColorStop(1, "black");
    ctx.fillStyle=gradient;
	/*ctx.shadowColor = "black";
	ctx.shadowBlur = 10;*/
	ctx.beginPath();		
    ctx.arc(this.x, this.y, this.rad, 0, 2*Math.PI,true);
    ctx.fill();
  };
  
  this.move = function() {
    
    //this.x += this.vx;
	 if(this.y>canvas.height+Planet.d*2.3){
		  AIArr[2]=AIArr[1];
		  AIArr[1]=AIArr[0];
		  AIArr[0]=new updateAI(planetRandomizer(),AIplanet.y+(AIplanet.d*2.5),AIplanet.vx,AIplanet.vy,AIplanet.d);
		 this.y += this.vy;
	 }
    else{
	  this.y += this.vy;
	//this.x+=this.vx;
	}};
	this.colision=function(){
		//var LineEnd=MathClampToR(LEND_X,LEND_Y);
		//console.log("x= "+player.x+"y="+player.y);
		var dx=this.x-player.x;
		var dy=this.y-player.y;
		if((dx * dx + dy * dy)<(this.rad+player.w*this.rad+player.w)){
			//alert("dead");
			gameState=2;
			//Reset();
			//alert("DEAD");
			//this.vy=0;
			//movePlayer(this.x,this.y);
			
			}
		};
}
function AIrandomeColor(){
	var cr = 'rgb('+
    Math.floor(Math.random()*256)+','+
    Math.floor(Math.random()*256)+','+
    Math.floor(Math.random()*256)+')';
	return cr;
}
 function createAI(No){
	for(var i=0;i<No;i++)
		{
			var PLan=new updateAI(planetRandomizer(),AIplanet.y+(i*AIplanet.d*5),AIplanet.vx,AIplanet.vy,AIplanet.d);
			AIArr[i]=PLan;
		}
}
//------------------------------
//Math TO Clamp the Maxdrawing r
//-------------------------------
function MathClampToR(x,y)
{
	var dx=x-(player.x+player.w/2);
	var dy=y-(player.y+player.h/2);
	if((dx * dx + dy * dy)<(MaxDrawDistLine*MaxDrawDistLine))
		{
			return{ x:x,y:y};
		}
	else
		{
			
			var angle=Math.atan2(dy,dx);
			var xx=player.x+MaxDrawDistLine*Math.cos(angle);
			var yy=player.y+MaxDrawDistLine*Math.sin(angle);
			return{
				x:xx,y:yy
			};
		}
}

// ALL EVENT LISTENERS IN ONE PLACE 
function EventListeners(){
	canvas.addEventListener('mousemove',function(evt){
	var mousePos = mouseEventManager(evt);
	LEND_X=mousePos.x;
	LEND_Y=mousePos.y;
	});
	
	canvas.addEventListener('mousedown', function (evt) {
            inputStates.mousedown = true;
            inputStates.mouseButton = evt.button;
      }, false);
	canvas.addEventListener('mouseup', function (evt) {
          inputStates.mousedown = false;
      }, false);
	window.addEventListener('keydown', function (event) {
           
            if (event.keyCode === 32) {
                inputStates.space = true;
            }
        }, false);
	window.addEventListener('keyup', function (event) {
            if (event.keyCode === 32) {
                inputStates.space = false;
            }
        }, false);
}

 function displayScore() {
      ctx.save();
      ctx.fillStyle = 'Green';
	 Math.floor(distanceTraveled);
      ctx.fillText("traveled: " + distanceTraveled, canvas.width-200, 30);
      ctx.restore();
    }
function BGRain(){
	var c=AIrandomeColor();
	ctx.strokeStyle = c;
    ctx.lineWidth = 1;
    ctx.lineCap = 'round';
	var init = [];
    var maxParts = 500;
	for(var a = 0; a < maxParts; a++) {
      init.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        l: Math.random() * 1,
        xs: -0.5+ Math.random() * 0.5 + 0.5,
        ys: Math.random() * 1 + 1
      });
    }
	var particles = [];
    for(var b = 0; b < maxParts; b++) {
      particles[b] = init[b];
    }
	this.draw=function(){
		for(var c = 0; c < particles.length; c++) {
        var p = particles[c];
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(p.x + p.l * p.xs, p.y + p.l * p.ys);
        ctx.stroke();
	}};
	this.move=function(){
		 for(var b = 0; b < particles.length; b++) {
        var p = particles[b];
        p.x += p.xs*0.5;
        p.y += p.ys*0.5;
        if(p.x > canvas.width || p.y > canvas.height) {
          p.x = Math.random() *  canvas.width;
          p.y = -20;
        }
	}
};
}