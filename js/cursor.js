/* ==========================================
   Project Lavender v2
   Cursor & Touch Effects
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    document.addEventListener("mousemove", createGlowTrail);

    document.addEventListener("click", (e) => {
        createHeartBurst(e.clientX, e.clientY);
        createSparkles(e.clientX, e.clientY);
        createRipple(e.clientX, e.clientY);
    });

    document.addEventListener("touchstart", (e) => {

        const touch = e.touches[0];

        createHeartBurst(touch.clientX, touch.clientY);
        createSparkles(touch.clientX, touch.clientY);
        createRipple(touch.clientX, touch.clientY);

    }, {
        passive: true
    });

});

/* ===========================
   Mouse Glow
=========================== */

function createGlowTrail(e) {

    if (window.innerWidth < 768) return;

    const glow = document.createElement("div");

    glow.style.position = "fixed";
    glow.style.left = e.clientX + "px";
    glow.style.top = e.clientY + "px";

    glow.style.width = "14px";
    glow.style.height = "14px";

    glow.style.borderRadius = "50%";

    glow.style.pointerEvents = "none";

    glow.style.background = "#d8b4fe";

    glow.style.filter = "blur(4px)";

    glow.style.opacity = ".7";

    glow.style.zIndex = "99999";

    document.body.appendChild(glow);

    glow.animate([

        {
            transform: "scale(1)",
            opacity: .7
        },

        {
            transform: "scale(0)",
            opacity: 0
        }

    ], {

        duration: 700,
        easing: "ease-out"

    });

    setTimeout(() => {

        glow.remove();

    }, 700);

}

/* ===========================
   Heart Burst
=========================== */

function createHeartBurst(x, y) {

    const hearts = ["💜", "💕", "❤️", "💖"];

    for (let i = 0; i < 10; i++) {

        const heart = document.createElement("div");

        heart.textContent =
            hearts[Math.floor(Math.random() * hearts.length)];

        heart.style.position = "fixed";
        heart.style.left = x + "px";
        heart.style.top = y + "px";

        heart.style.fontSize =
            (18 + Math.random() * 16) + "px";

        heart.style.pointerEvents = "none";

        heart.style.zIndex = "99999";

        document.body.appendChild(heart);

        const angle = Math.random() * Math.PI * 2;

        const distance = 80 + Math.random() * 80;

        heart.animate([

            {

                transform: "translate(0,0) scale(1)",
                opacity: 1

            },

            {

                transform:
                    `translate(${Math.cos(angle)*distance}px,${Math.sin(angle)*distance}px) scale(.2)`,

                opacity: 0

            }

        ], {

            duration: 1200,
            easing: "ease-out"

        });

        setTimeout(() => {

            heart.remove();

        }, 1200);

    }

}

/* ===========================
   Sparkles
=========================== */

function createSparkles(x, y) {

    for (let i = 0; i < 18; i++) {

        const dot = document.createElement("div");

        dot.style.position = "fixed";

        dot.style.left = x + "px";
        dot.style.top = y + "px";

        dot.style.width = "5px";
        dot.style.height = "5px";

        dot.style.borderRadius = "50%";

        dot.style.background =
            ["#ffffff", "#ff7bc4", "#d8b4fe", "#ffd700"][Math.floor(Math.random() * 4)];

        dot.style.pointerEvents = "none";

        dot.style.zIndex = "99999";

        document.body.appendChild(dot);

        const angle = Math.random() * Math.PI * 2;

        const dist = Math.random() * 90;

        dot.animate([

            {

                transform: "translate(0,0)",
                opacity: 1

            },

            {

                transform:
                    `translate(${Math.cos(angle)*dist}px,${Math.sin(angle)*dist}px)`,

                opacity: 0

            }

        ], {

            duration: 900

        });

        setTimeout(() => {

            dot.remove();

        }, 900);

    }

}

/* ===========================
   Ripple
=========================== */

function createRipple(x, y) {

    const ripple = document.createElement("div");

    ripple.style.position = "fixed";

    ripple.style.left = x + "px";
    ripple.style.top = y + "px";

    ripple.style.width = "20px";
    ripple.style.height = "20px";

    ripple.style.border =
        "2px solid rgba(216,180,254,.7)";

    ripple.style.borderRadius = "50%";

    ripple.style.pointerEvents = "none";

    ripple.style.zIndex = "99998";

    document.body.appendChild(ripple);

    ripple.animate([

        {

            transform:
                "translate(-50%,-50%) scale(.3)",

            opacity: 1

        },

        {

            transform:
                "translate(-50%,-50%) scale(6)",

            opacity: 0

        }

    ], {

        duration: 700,
        easing: "ease-out"

    });

    setTimeout(() => {

        ripple.remove();

    }, 700);

}
