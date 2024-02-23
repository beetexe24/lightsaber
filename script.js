

var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');


var lightsaberCollection = [];

function lightSaber(x1, y1, x2, y2, speed, colorType, origX1, origY1, origX2, origY2){
	this.x1 = x1;
	this.y1 = y1;
	this.x2 = x2;
	this.y2 = y2;
	this.speed = speed;
	this.colorType = colorType;
	this.origX1 = origX1;
	this.origY1 = origY1;
	this.origX2 = origX2;
	this.origY2 = origY2;
}

createlightSaber();


function createlightSaber(){
ctx.clearRect(0,0,canvas.width,canvas.height);
	for(var i = 0; i < 150; i++){

		var x1 = window.innerWidth - 30;
		var x2 = window.innerWidth;
		var getHalfwidth = window.innerWidth / 8;
		var y1 = -getHalfwidth;
		var y2 = -getHalfwidth + -30;
		
		var speedSec = (Math.floor(Math.random() * 10) + 5);
		var speedMil = Math.random();
		var speed = speedSec + speedMil;
		var randomX = (Math.floor(Math.random() * window.innerWidth) + 1);
		var randomY = (Math.floor(Math.random() * 100) + 1);
		var randomColor = (Math.floor(Math.random() * 3) + 1);
		var colorList = ['blue', '#2CF90D'];
		var colorType = colorList[randomColor - 1];
		
		if (randomX % 2){
			x1 -= randomX;
			x2 -= randomX;
			y1 += -randomY;
			y2 += -randomY;
		} else {
			x1 += randomX;
			x2 += randomX ;
			y1 -= -randomY;
			y2 -= -randomY;
		}

		var create = new lightSaber(x1, y1, x2, y2, speed, colorType, x1, y1, x2, y2);
		lightsaberCollection.push(create);
	}

}



function drawLightSaber(){

	for(var i = 0; i < lightsaberCollection.length; i++){

		var initialSpeed = (Math.floor(Math.random() * 10) + 1);
		initialSpeed = initialSpeed / 15;

		if (lightsaberCollection[i].y1 < 1 || lightsaberCollection[i].y2 < 1 || lightsaberCollection[i].x1 > canvas.width || lightsaberCollection[i].x2 > canvas.width){
			lightsaberCollection[i].x1 -= initialSpeed;
			lightsaberCollection[i].x2 -= initialSpeed;
			lightsaberCollection[i].y1 += initialSpeed;
			lightsaberCollection[i].y2 += initialSpeed;
		} else {
			lightsaberCollection[i].x1 -= lightsaberCollection[i].speed;
			lightsaberCollection[i].x2 -= lightsaberCollection[i].speed;
			lightsaberCollection[i].y1 += lightsaberCollection[i].speed;
			lightsaberCollection[i].y2 += lightsaberCollection[i].speed;
		}

		ctx.beginPath();
		ctx.moveTo(lightsaberCollection[i].x1, lightsaberCollection[i].y1);
		ctx.lineTo(lightsaberCollection[i].x2, lightsaberCollection[i].y2);
		ctx.lineWidth = 3;
		ctx.strokeStyle = lightsaberCollection[i].colorType;
		ctx.shadowColor = lightsaberCollection[i].colorType;
		ctx.shadowBlur = 12;
		ctx.closePath();
		ctx.stroke();
	}



	for(var i = 0; i < lightsaberCollection.length; i++){
		if (lightsaberCollection[i].y1 > canvas.height || lightsaberCollection[i].y2 > canvas.height){
			lightsaberCollection[i].x1 = lightsaberCollection[i].origX1;
			lightsaberCollection[i].x2 = lightsaberCollection[i].origX2 ;
			lightsaberCollection[i].y1 = lightsaberCollection[i].origY1 ;
			lightsaberCollection[i].y2 = lightsaberCollection[i].origY2 ;
		}
	}



}

createlightSaber();

function animate(){
	ctx.clearRect(0,0, canvas.width, canvas.height);
	//ctx.fillStyle = 'rgba(0,0,0,0.05)';
	//ctx.fillRect(0,0,canvas.width * 4, canvas.height * 4);

	drawLightSaber();

	requestAnimationFrame(animate);
}

requestAnimationFrame(animate);

resizeCanvasToDisplaySize(ctx.canvas);

function resizeCanvasToDisplaySize(canvas) {
   // look up the size the canvas is being displayed
   const width = canvas.clientWidth;
   const height = canvas.clientHeight;

   // If it's resolution does not match change it
   if (canvas.width !== width || canvas.height !== height) {
     canvas.width = width;
     canvas.height = height;
     return true;
   }

   return false;
}




