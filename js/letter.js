/* ==========================================
   Project Lavender v2
   Love Letter
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    const envelope = document.getElementById("envelope");
    const letter = document.getElementById("letter");

    if (!envelope || !letter) return;

    envelope.addEventListener("click", () => {

        envelope.animate([
            {
                transform: "scale(1)"
            },
            {
                transform: "scale(1.15) rotate(-8deg)"
            },
            {
                transform: "scale(0)"
            }
        ], {
            duration: 700,
            easing: "ease-in-out",
            fill: "forwards"
        });

        setTimeout(() => {

            envelope.style.display = "none";

            letter.style.display = "block";

            letter.animate([
                {
                    opacity: 0,
                    transform: "translateY(40px)"
                },
                {
                    opacity: 1,
                    transform: "translateY(0)"
                }
            ], {
                duration: 900,
                easing: "ease-out",
                fill: "forwards"
            });

        }, 650);

    });

});
