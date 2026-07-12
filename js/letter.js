document.addEventListener("DOMContentLoaded", () => {

    const envelope = document.getElementById("envelope");
    const letter = document.getElementById("letter");

    if (!envelope || !letter) {
        console.log("Letter elements missing");
        return;
    }

    envelope.addEventListener("click", () => {

        envelope.classList.toggle("open");

        setTimeout(() => {
            letter.classList.toggle("show");
        }, 500);

    });

});
