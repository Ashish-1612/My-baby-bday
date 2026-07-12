/* ==========================================
   Project Lavender v2
   Premium Music Player
========================================== */

let audio = null;
let isPlaying = false;

document.addEventListener("DOMContentLoaded", () => {

    audio = new Audio("assets/music/birthday.mp3");

    audio.loop = true;

    audio.volume = 0.25;

    const button = document.getElementById("musicToggle");

    if (!button) return;

    button.innerHTML = "🎵";

    button.addEventListener("click", toggleMusic);

});

function toggleMusic(){

    if(!audio) return;

    if(isPlaying){

        fadeOut();

    }else{

        fadeIn();

    }

}

function fadeIn(){

    audio.volume = 0;

    audio.play().catch(()=>{});

    isPlaying = true;

    document.getElementById("musicToggle").innerHTML="⏸️";

    rotateButton(true);

    let volume = 0;

    const interval = setInterval(()=>{

        volume += 0.02;

        if(volume >= 0.25){

            volume = 0.25;

            clearInterval(interval);

        }

        audio.volume = volume;

    },120);

}

function fadeOut(){

    let volume = audio.volume;

    const interval = setInterval(()=>{

        volume -= 0.02;

        if(volume <= 0){

            clearInterval(interval);

            audio.pause();

            audio.currentTime = 0;

            document.getElementById("musicToggle").innerHTML="🎵";

            rotateButton(false);

            isPlaying = false;

        }

        audio.volume = Math.max(0,volume);

    },120);

}

function rotateButton(enable){

    const btn = document.getElementById("musicToggle");

    if(!btn) return;

    if(enable){

        btn.animate([

            {

                transform:"rotate(0deg)"

            },

            {

                transform:"rotate(360deg)"

            }

        ],{

            duration:3000,

            iterations:Infinity

        });

    }else{

        btn.getAnimations().forEach(animation=>animation.cancel());

    }

}

/* ==========================================
   Auto Start After Enter Button
========================================== */

document.addEventListener("click",(e)=>{

    if(e.target.id==="enterButton"){

        setTimeout(()=>{

            if(!isPlaying){

                fadeIn();

            }

        },1000);

    }

});
