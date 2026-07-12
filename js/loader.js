/* ==========================================
   Project Lavender v2
   Cinematic Loader
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    const loader = document.getElementById("loader");
    const enterButton = document.getElementById("enterButton");
    const app = document.getElementById("app");

    // Hide website until intro is finished
    app.style.opacity = "0";
    app.style.transform = "translateY(30px)";
    app.style.transition =
        "opacity 1.2s ease, transform 1.2s ease";

    document.body.style.overflow = "hidden";

    createLoaderStars();

    enterButton.addEventListener("click", enterExperience);

});

/* ===========================
   Enter Website
=========================== */

function enterExperience() {

    const loader = document.getElementById("loader");
    const app = document.getElementById("app");

    loader.classList.add("hide");

    document.body.style.overflowY = "auto";

    setTimeout(() => {

        app.style.opacity = "1";
        app.style.transform = "translateY(0)";

        animateHero();

        startBackgroundSparkles();

        startAmbientAnimation();

    }, 800);

}

/* ===========================
   Hero Entrance
=========================== */

function animateHero() {

    const hero = document.querySelector(".glass");

    if (!hero) return;

    hero.animate([

        {
            opacity: 0,
            transform: "translateY(50px) scale(.95)"
        },

        {
            opacity: 1,
            transform: "translateY(0) scale(1)"
        }

    ], {

        duration: 1200,
        easing: "ease-out",
        fill: "forwards"

    });

}

/* ===========================
   Floating Loader Stars
=========================== */

function createLoaderStars() {

    const loader = document.getElementById("loader");

    for (let i = 0; i < 80; i++) {

        const star = document.createElement("div");

        star.style.position = "absolute";
        star.style.width = "2px";
        star.style.height = "2px";
        star.style.borderRadius = "50%";
        star.style.background = "white";

        star.style.left = Math.random() * 100 + "%";
        star.style.top = Math.random() * 100 + "%";

        star.style.opacity = Math.random();

        star.animate([

            {
                opacity: .2,
                transform: "scale(1)"
            },

            {
                opacity: 1,
                transform: "scale(2)"
            },

            {
                opacity: .2,
                transform: "scale(1)"
            }

        ], {

            duration: 1500 + Math.random() * 3000,
            iterations: Infinity

        });

        loader.appendChild(star);

    }

}

/* ===========================
   Sparkles
=========================== */

function startBackgroundSparkles() {

    const container = document.getElementById("sparkles");

    if (!container) return;

    setInterval(() => {

        const sparkle = document.createElement("div");

        sparkle.style.position = "absolute";

        sparkle.style.left = Math.random() * 100 + "%";
        sparkle.style.top = Math.random() * 100 + "%";

        sparkle.style.width = "4px";
        sparkle.style.height = "4px";

        sparkle.style.borderRadius = "50%";

        sparkle.style.background = "#ffffff";

        sparkle.style.boxShadow =
            "0 0 15px white";

        sparkle.animate([

            {
                opacity: 0,
                transform: "scale(.3)"
            },

            {
                opacity: 1,
                transform: "scale(1)"
            },

            {
                opacity: 0,
                transform: "scale(0)"
            }

        ], {

            duration: 2500,
            easing: "ease-out"

        });

        container.appendChild(sparkle);

        setTimeout(() => {

            sparkle.remove();

        }, 2600);

    }, 250);

}

/* ===========================
   Aurora Movement
=========================== */

function startAmbientAnimation() {

    const aurora = document.getElementById("aurora");

    if (!aurora) return;

    let hue = 0;

    setInterval(() => {

        hue += 0.5;

        aurora.style.filter =
            `blur(80px) hue-rotate(${hue}deg)`;

    }, 60);

}

/* ===========================
   Optional Music Trigger
=========================== */

function startMusic() {

    if (window.musicStarted) return;

    const music = document.getElementById("bgMusic");

    if (music) {

        music.volume = 0.25;

        music.play().catch(() => {});

        window.musicStarted = true;

    }

}
