function $(id){return document.getElementById(id);}
var screen = $('grid');
 
var ctx = $('grid').getContext('2d');
 
window.onresize = function(){
    init();
}
 
window.onload = function() {
    init();
}

function init(){
 
screen.width = window.innerWidth;
screen.height = window.innerHeight;
ctx.strokeStyle ="#fff";
 
var mW = Math.floor(screen.width/300);
var mH = Math.floor(screen.height/300);
 
ctx.lineWidth=1;
 
for(var x=0; x<screen.width; x+=300)
{
    ctx.moveTo(x,0);
    ctx.lineTo(x,screen.height);
}
 
for(var y=0; y<screen.height; y+=300)
{
    ctx.moveTo(0,y);
    ctx.lineTo(screen.width,y);
}
 
for(var i=0;i<=mW; i++){
    ctx.stroke();
    ctx.fillStyle = "#cccccc";
    for(var j=0; j<=mH; j++){
        ctx.rect((300*i)-10,(300*j)-1,20,2);
        ctx.fill();
    }
}
 
}