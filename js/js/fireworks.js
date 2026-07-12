/* ==========================================
   Project Lavender v2
   Premium Fireworks Engine
========================================== */

(() => {

const canvas = document.getElementById("fireworksCanvas");

if(!canvas) return;

const ctx = canvas.getContext("2d");

let fireworks = [];
let particles = [];
let animationRunning = false;

/* ========================= */

function resize(){

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

}

resize();

window.addEventListener("resize", resize);

/* =========================
   Firework Rocket
========================= */

class Firework{

constructor(){

this.x=Math.random()*canvas.width;

this.y=canvas.height+20;

this.tx=Math.random()*canvas.width;

this.ty=Math.random()*canvas.height*.45+80;

this.speed=5+Math.random()*2;

this.color=randomColor();

this.done=false;

}

update(){

if(this.done) return;

const dx=this.tx-this.x;
const dy=this.ty-this.y;

const dist=Math.sqrt(dx*dx+dy*dy);

if(dist<8){

this.done=true;

explode(this.tx,this.ty,this.color);

return;

}

this.x+=dx/dist*this.speed;
this.y+=dy/dist*this.speed;

ctx.beginPath();

ctx.arc(this.x,this.y,2.8,0,Math.PI*2);

ctx.fillStyle=this.color;

ctx.shadowBlur=15;
ctx.shadowColor=this.color;

ctx.fill();

ctx.shadowBlur=0;

}

}

/* =========================
   Particle
========================= */

class Particle{

constructor(x,y,color){

this.x=x;
this.y=y;

const angle=Math.random()*Math.PI*2;

const speed=Math.random()*7+2;

this.vx=Math.cos(angle)*speed;
this.vy=Math.sin(angle)*speed;

this.life=100;

this.color=color;

}

update(){

this.x+=this.vx;

this.y+=this.vy;

this.vy+=0.035;

this.life--;

ctx.globalAlpha=this.life/100;

ctx.beginPath();

ctx.arc(this.x,this.y,2,0,Math.PI*2);

ctx.fillStyle=this.color;

ctx.fill();

ctx.globalAlpha=1;

}

}

/* =========================
   Explosion
========================= */

function explode(x,y,color){

for(let i=0;i<120;i++){

particles.push(

new Particle(x,y,color)

);

}

}

/* =========================
   Heart Explosion
========================= */

function heartExplosion(x,y){

const color="#FF6FAF";

for(let i=0;i<180;i++){

const t=(Math.PI*2*i)/180;

const hx=16*Math.pow(Math.sin(t),3);

const hy=13*Math.cos(t)
-5*Math.cos(2*t)
-2*Math.cos(3*t)
-Math.cos(4*t);

particles.push({

x:x,

y:y,

vx:hx*.45,

vy:-hy*.45,

life:120,

color

});

}

}

/* =========================
   Balloons
========================= */

function launchBalloons(){

for(let i=0;i<30;i++){

const b=document.createElement("div");

b.innerHTML="🎈";

b.style.position="fixed";

b.style.left=Math.random()*100+"vw";

b.style.bottom="-80px";

b.style.fontSize=(28+Math.random()*18)+"px";

b.style.pointerEvents="none";

b.style.zIndex="9999";

document.body.appendChild(b);

b.animate([

{

transform:"translateY(0)"

},

{

transform:`translateY(-${window.innerHeight+300}px)
translateX(${Math.random()*200-100}px)`

}

],{

duration:9000+Math.random()*4000,

easing:"linear",

fill:"forwards"

});

setTimeout(()=>{

b.remove();

},13000);

}

}

/* =========================
   Rose Petals
========================= */

function petals(){

for(let i=0;i<60;i++){

const p=document.createElement("div");

p.innerHTML="🌸";

p.style.position="fixed";

p.style.left=Math.random()*100+"vw";

p.style.top="-40px";

p.style.fontSize="24px";

p.style.pointerEvents="none";

p.style.zIndex="9999";

document.body.appendChild(p);

p.animate([

{

transform:"translateY(0) rotate(0deg)"

},

{

transform:`translateY(${window.innerHeight+100}px)
translateX(${Math.random()*200-100}px)
rotate(720deg)`

}

],{

duration:7000+Math.random()*3000,

easing:"linear",

fill:"forwards"

});

setTimeout(()=>{

p.remove();

},11000);

}

}

/* =========================
   Animation Loop
========================= */

function animate(){

ctx.clearRect(0,0,canvas.width,canvas.height);

fireworks=fireworks.filter(f=>!f.done);

fireworks.forEach(f=>f.update());

particles=particles.filter(p=>p.life>0);

particles.forEach(p=>{

if(p instanceof Particle){

p.update();

}else{

p.x+=p.vx;

p.y+=p.vy;

p.life--;

ctx.globalAlpha=p.life/120;

ctx.beginPath();

ctx.arc(p.x,p.y,2,0,Math.PI*2);

ctx.fillStyle=p.color;

ctx.fill();

ctx.globalAlpha=1;

}

});

requestAnimationFrame(animate);

}

/* =========================
   Public Function
========================= */

window.startFireworks=function(){

if(animationRunning) return;

animationRunning=true;

animate();

const launcher=setInterval(()=>{

fireworks.push(new Firework());

},500);

setTimeout(()=>{

heartExplosion(

canvas.width/2,

canvas.height*.28

);

launchBalloons();

petals();

},5000);

setTimeout(()=>{

clearInterval(launcher);

},12000);

};

/* ========================= */

function randomColor(){

const colors=[

"#FF7BC4",

"#D8B4FE",

"#B794F4",

"#FFD700",

"#FFFFFF"

];

return colors[Math.floor(Math.random()*colors.length)];

}

})();
