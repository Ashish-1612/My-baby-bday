/* ==========================================
   Project Lavender v2
   Balloon Pop Mini-Game
========================================== */

(() => {

const messages = [

    { emoji: "😘", text: "I love the way you laugh at your own jokes." },
    { emoji: "🌙", text: "You're the best part of my every night." },
    { emoji: "🫂", text: "Your hugs feel like home to me." },
    { emoji: "🌈", text: "You make ordinary days feel magical." },
    { emoji: "🎶", text: "You're my favourite song on repeat." },
    { emoji: "🌟", text: "You shine brighter than you know." }

];

const colors = [
    "#ff7bc4",
    "#d8b4fe",
    "#9d4edd",
    "#ffb3c6",
    "#b794f4",
    "#ff9edb"
];

let poppedCount = 0;

document.addEventListener("DOMContentLoaded", () => {

    renderBalloons();

});

/* ==========================
   Render Balloons
========================== */

function renderBalloons(){

    const scene = document.getElementById("balloonScene");

    if(!scene) return;

    scene.innerHTML = "";

    messages.forEach((msg, index) => {

        const balloon = document.createElement("div");

        balloon.className = "balloon";

        balloon.style.setProperty(
            "--color",
            colors[index % colors.length]
        );

        balloon.innerHTML = `

            <div class="balloon-body"></div>

            <div class="balloon-string"></div>

            <div class="balloon-message">
                ${msg.emoji} ${msg.text}
            </div>

        `;

        balloon.addEventListener("click", (e) => {

            popBalloon(balloon, e.clientX, e.clientY);

        });

        scene.appendChild(balloon);

        floatBalloon(
            balloon.querySelector(".balloon-body"),
            index
        );

    });

}

/* ==========================
   Idle Floating Motion
========================== */

function floatBalloon(body, index){

    if(!body) return;

    const duration = 2200 + Math.random() * 1000;

    body.animate([

        { transform: "translateY(0px)" },
        { transform: `translateY(${-10 - Math.random() * 10}px)` },
        { transform: "translateY(0px)" }

    ], {

        duration,
        iterations: Infinity,
        easing: "ease-in-out",
        delay: index * 150

    });

}

/* ==========================
   Pop Logic
========================== */

function popBalloon(balloon, x, y){

    if(balloon.classList.contains("popped")) return;

    balloon.classList.add("popped");

    poppedCount++;

    burstConfetti(x, y);

    if(poppedCount === messages.length){

        setTimeout(revealContinueButton, 700);

    }

}

/* ==========================
   Confetti Burst
========================== */

function burstConfetti(x, y){

    for(let i = 0; i < 18; i++){

        const piece = document.createElement("div");

        piece.style.position = "fixed";
        piece.style.left = x + "px";
        piece.style.top = y + "px";
        piece.style.width = "7px";
        piece.style.height = "7px";
        piece.style.borderRadius = "50%";
        piece.style.background =
            colors[Math.floor(Math.random() * colors.length)];
        piece.style.pointerEvents = "none";
        piece.style.zIndex = "9999";

        document.body.appendChild(piece);

        const angle = Math.random() * Math.PI * 2;
        const distance = 60 + Math.random() * 90;

        piece.animate([

            {
                transform: "translate(0,0)",
                opacity: 1
            },

            {
                transform:
                    `translate(${Math.cos(angle) * distance}px,
                     ${Math.sin(angle) * distance}px)`,
                opacity: 0
            }

        ], {

            duration: 700 + Math.random() * 400,
            easing: "ease-out"

        });

        setTimeout(() => piece.remove(), 1200);

    }

}

/* ==========================
   Continue Button
========================== */

function revealContinueButton(){

    const btn = document.getElementById("balloonContinue");
    const hint = document.getElementById("balloonHint");

    if(hint) hint.style.display = "none";

    if(!btn) return;

    btn.style.display = "inline-block";

    btn.animate([

        { opacity: 0, transform: "translateY(20px)" },
        { opacity: 1, transform: "translateY(0)" }

    ], {

        duration: 600,
        easing: "ease-out",
        fill: "forwards"

    });

}

document.addEventListener("DOMContentLoaded", () => {

    const btn = document.getElementById("balloonContinue");

    if(!btn) return;

    btn.addEventListener("click", () => {

        const gift = document.getElementById("giftSection");

        if(gift){

            gift.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });

        }

    });

});

})();
