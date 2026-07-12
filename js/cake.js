/* ==========================================
   Project Lavender v2
   Interactive Birthday Cake
========================================== */

(() => {

let candlesBlown = false;

document.addEventListener("DOMContentLoaded", () => {

    renderCake();

});

/* ==========================
   Render Cake
========================== */

function renderCake(){

    const scene = document.getElementById("cakeScene");

    if(!scene) return;

    scene.innerHTML = `

        <div class="cake">

            <div class="layer layer1">

                <div class="frosting"></div>

            </div>

            <div class="layer layer2">

                <div class="frosting"></div>

            </div>

            <div class="layer layer3">

                <div class="frosting"></div>

                <div class="candle" style="left:18px;">
                    <div class="flame"></div>
                </div>

                <div class="candle" style="left:54px;">
                    <div class="flame"></div>
                </div>

                <div class="candle" style="left:90px;">
                    <div class="flame"></div>
                </div>

            </div>

        </div>

        <div class="stand"></div>

        <button id="blowCandles">
            🎂 Blow Out Candles
        </button>

    `;

    createSparkles();

    document
        .getElementById("blowCandles")
        .addEventListener("click", blowCandles);

}

/* ==========================
   Floating Sparkles
========================== */

function createSparkles(){

    const cake = document.querySelector(".cake");

    if(!cake) return;

    setInterval(()=>{

        const star = document.createElement("div");

        star.className="cake-sparkle";

        star.style.left=Math.random()*260+"px";
        star.style.top=Math.random()*260+"px";

        cake.appendChild(star);

        setTimeout(()=>{

            star.remove();

        },2000);

    },350);

}

/* ==========================
   Blow Candles
========================== */

function blowCandles(){

    if(candlesBlown) return;

    candlesBlown = true;

    document
        .querySelectorAll(".flame")
        .forEach(flame=>{

            flame.animate([

                {
                    opacity:1,
                    transform:"translateX(-50%) scale(1)"
                },

                {
                    opacity:0,
                    transform:"translateX(-50%) scale(0)"
                }

            ],{

                duration:400,
                fill:"forwards"

            });

        });

    createSmoke();

    celebrate();

}

/* ==========================
   Smoke
========================== */

function createSmoke(){

    document
        .querySelectorAll(".candle")
        .forEach(candle=>{

            for(let i=0;i<4;i++){

                const smoke=document.createElement("div");

                smoke.className="smoke";

                smoke.style.left="0px";
                smoke.style.top="-10px";

                smoke.style.animationDelay=
                    (i*0.2)+"s";

                candle.appendChild(smoke);

            }

        });

}

/* ==========================
   Celebration
========================== */

function celebrate(){

    const btn=document.getElementById("blowCandles");

    btn.disabled=true;

    btn.textContent="🎉 Happy Birthday Guddu!";

    launchConfetti();

    if(window.startFireworks){

        setTimeout(()=>{

            window.startFireworks();

        },800);

    }

    if(window.completeCake){

        setTimeout(()=>{

            window.completeCake();

        },5000);

    }

}

/* ==========================
   Confetti
========================== */

function launchConfetti(){

    const colors=[
        "#FF7BC4",
        "#D8B4FE",
        "#FFFFFF",
        "#FFD700",
        "#B794F4"
    ];

    for(let i=0;i<180;i++){

        const piece=document.createElement("div");

        piece.style.position="fixed";

        piece.style.left=
            Math.random()*100+"vw";

        piece.style.top="-20px";

        piece.style.width="8px";
        piece.style.height="14px";

        piece.style.background=
            colors[
                Math.floor(
                    Math.random()*colors.length
                )
            ];

        piece.style.borderRadius="3px";

        piece.style.pointerEvents="none";

        piece.style.zIndex="9999";

        document.body.appendChild(piece);

        piece.animate([

            {

                transform:
                "translateY(0) rotate(0deg)"

            },

            {

                transform:
                `translateY(${window.innerHeight+120}px)
                 translateX(${Math.random()*300-150}px)
                 rotate(${Math.random()*900}deg)`

            }

        ],{

            duration:
            3500+Math.random()*2500,

            easing:"ease-out"

        });

        setTimeout(()=>{

            piece.remove();

        },6500);

    }

}

})();
