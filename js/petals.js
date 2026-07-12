/* ==========================================
   Project Lavender v2
   Ambient Falling Petals
========================================== */

(() => {

const symbols = ["🌸", "💮", "💗", "🤍", "💜"];

document.addEventListener("DOMContentLoaded", () => {

    const container = document.getElementById("petals");

    if(!container) return;

    setInterval(() => {

        spawnPetal(container);

    }, 900);

});

/* ==========================
   Spawn One Petal
========================== */

function spawnPetal(container){

    const petal = document.createElement("div");

    petal.className = "petal";

    petal.textContent =
        symbols[Math.floor(Math.random() * symbols.length)];

    const size = 14 + Math.random() * 14;
    const startX = Math.random() * 100;
    const drift = (Math.random() - 0.5) * 160;
    const duration = 9000 + Math.random() * 6000;
    const rotation = (Math.random() - 0.5) * 360;

    petal.style.left = startX + "vw";
    petal.style.fontSize = size + "px";
    petal.style.opacity = 0.35 + Math.random() * 0.3;

    container.appendChild(petal);

    const fallHeight = window.innerHeight + 80;

    petal.animate([

        {
            transform: "translate(0, 0) rotate(0deg)",
            offset: 0
        },

        {
            transform:
                `translate(${drift * 0.5}px, ${fallHeight * 0.5}px)
                 rotate(${rotation * 0.5}deg)`,
            offset: 0.5
        },

        {
            transform:
                `translate(${drift}px, ${fallHeight}px)
                 rotate(${rotation}deg)`,
            offset: 1
        }

    ], {

        duration,
        easing: "ease-in",
        fill: "forwards"

    });

    setTimeout(() => {

        petal.remove();

    }, duration + 200);

}

})();
