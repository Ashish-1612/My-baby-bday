/* ==========================================
   Project Lavender v2
   Premium 3D Gallery
========================================== */

const photos = [

{
image:"assets/photos/01.jpg",
title:"Beautiful Smile",
caption:"Every smile makes my day brighter."
},

{
image:"assets/photos/02.jpg",
title:"My Favourite Person",
caption:"Some moments deserve to last forever."
},

{
image:"assets/photos/03.jpg",
title:"Precious Memory",
caption:"Life feels beautiful with you."
},

{
image:"assets/photos/04.jpg",
title:"Together",
caption:"Every picture tells our story."
},

{
image:"assets/photos/05.jpg",
title:"Golden Moments",
caption:"A memory I'll always cherish."
},

{
image:"assets/photos/06.jpg",
title:"Joy",
caption:"Your happiness is my happiness."
},

{
image:"assets/photos/07.jpg",
title:"Beautiful You",
caption:"You light up every room."
},

{
image:"assets/photos/08.jpg",
title:"Endless Memories",
caption:"A lifetime of smiles begins here."
},

{
image:"assets/photos/09.jpg",
title:"Forever",
caption:"Every heartbeat remembers you."
},

{
image:"assets/photos/10.jpg",
title:"Dreams",
caption:"May all your dreams come true."
},

{
image:"assets/photos/11.jpg",
title:"Birthday Girl",
caption:"Today is all about you ❤️"
},

{
image:"assets/photos/12.jpg",
title:"My Guddu",
caption:"The world feels warmer because of you."
},

{
image:"assets/photos/13.jpg",
title:"Always",
caption:"Forever grateful for every memory."
}

];

let currentIndex = 0;

const carousel = document.getElementById("carousel");

if(carousel){

createCarousel();

setInterval(nextSlide,4500);

}

/* ===================== */

function createCarousel(){

carousel.innerHTML="";

const track=document.createElement("div");
track.className="carousel-track";

carousel.appendChild(track);

photos.forEach((photo,index)=>{

const card=document.createElement("div");

card.className="photo-card";

card.innerHTML=`

<img src="${photo.image}" alt="Memory">

<div class="photo-caption">

<h3>${photo.title}</h3>

<p>${photo.caption}</p>

</div>

`;

card.onclick=()=>openFullscreen(index);

track.appendChild(card);

});

updateCarousel();

createControls();

}

/* ===================== */

function updateCarousel(){

const cards=document.querySelectorAll(".photo-card");

cards.forEach((card,index)=>{

let offset=index-currentIndex;

if(offset>6) offset-=photos.length;

if(offset<-6) offset+=photos.length;

const x=offset*220;

const z=Math.abs(offset)*-180;

const rotate=offset*-12;

const scale=offset===0?1.08:.82;

card.style.transform=

`translate(-50%,-50%)
translateX(${x}px)
translateZ(${z}px)
rotateY(${rotate}deg)
scale(${scale})`;

card.style.opacity=Math.abs(offset)>3?0:.95;

card.classList.remove("active","left","right");

if(offset===0) card.classList.add("active");

if(offset<0) card.classList.add("left");

if(offset>0) card.classList.add("right");

});

}

/* ===================== */

function nextSlide(){

currentIndex++;

if(currentIndex>=photos.length){

currentIndex=0;

}

updateCarousel();

}

function prevSlide(){

currentIndex--;

if(currentIndex<0){

currentIndex=photos.length-1;

}

updateCarousel();

}

/* ===================== */

function createControls(){

const prev=document.createElement("div");

prev.className="carousel-nav carousel-prev";

prev.innerHTML="❮";

prev.onclick=prevSlide;

carousel.appendChild(prev);

const next=document.createElement("div");

next.className="carousel-nav carousel-next";

next.innerHTML="❯";

next.onclick=nextSlide;

carousel.appendChild(next);

}

/* ===================== */
/* Swipe Support */
/* ===================== */

let touchStart=0;

carousel.addEventListener("touchstart",e=>{

touchStart=e.touches[0].clientX;

});

carousel.addEventListener("touchend",e=>{

const end=e.changedTouches[0].clientX;

const diff=touchStart-end;

if(diff>50){

nextSlide();

}

if(diff<-50){

prevSlide();

}

});

/* ===================== */
/* Fullscreen Viewer */
/* ===================== */

function openFullscreen(index){

const overlay=document.createElement("div");

overlay.style.position="fixed";

overlay.style.inset="0";

overlay.style.background="rgba(0,0,0,.95)";

overlay.style.display="flex";

overlay.style.justifyContent="center";

overlay.style.alignItems="center";

overlay.style.zIndex="999999";

overlay.innerHTML=`

<div style="text-align:center">

<img src="${photos[index].image}"

style="max-width:92vw;
max-height:82vh;
border-radius:24px;
box-shadow:0 20px 60px rgba(0,0,0,.6);">

<p style="
margin-top:25px;
color:white;
font-size:18px;
">

${photos[index].caption}

</p>

</div>

`;

overlay.onclick=()=>overlay.remove();

document.body.appendChild(overlay);

}
