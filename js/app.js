/* ==========================================
   Project Lavender v2
   Main Application Controller
========================================== */

(() => {

let cakeCompleted = false;
let giftOpened = false;

/* ==========================
   Initialize App
========================== */

document.addEventListener("DOMContentLoaded", () => {

    initializeSections();

    initializeGiftBox();

    initializeParallax();

    initializeGreeting();

});

/* ==========================
   Section Reveal Animation
========================== */

function initializeSections(){

    const sections = document.querySelectorAll(".page");

    const observer = new IntersectionObserver((entries)=>{

        entries.forEach(entry=>{

            if(entry.isIntersecting){

                entry.target.animate([

                    {
                        opacity:0,
                        transform:"translateY(60px)"
                    },

                    {
                        opacity:1,
                        transform:"translateY(0)"
                    }

                ],{

                    duration:900,
                    easing:"ease-out",
                    fill:"forwards"

                });

            }

        });

    },{

        threshold:.25

    });

    sections.forEach(section=>{

        section.style.opacity="0";

        observer.observe(section);

    });

}

/* ==========================
   Hero Greeting
========================== */

function initializeGreeting(){

    const title = document.querySelector(".hero-section h1");

    if(!title) return;

    title.animate([

        {

            letterSpacing:"0px",

            opacity:.5

        },

        {

            letterSpacing:"2px",

            opacity:1

        }

    ],{

        duration:2500,

        iterations:Infinity,

        direction:"alternate"

    });

}

/* ==========================
   Floating Parallax
========================== */

function initializeParallax(){

    document.addEventListener("mousemove",(e)=>{

        if(window.innerWidth < 768) return;

        const x=(e.clientX/window.innerWidth-.5)*12;
        const y=(e.clientY/window.innerHeight-.5)*12;

        document.querySelectorAll(".glass").forEach(card=>{

            card.style.transform=

            `rotateY(${x}deg)
             rotateX(${-y}deg)`;

        });

    });

}

/* ==========================
   Cake Celebration
========================== */

window.completeCake = function(){

    if(cakeCompleted) return;

    cakeCompleted = true;

    if(window.startFireworks){

        startFireworks();

    }

    setTimeout(()=>{

        scrollToGift();

    },6000);

}

/* ==========================
   Scroll To Gift
========================== */

function scrollToGift(){

    const gift=document.getElementById("giftBox");

    if(!gift) return;

    gift.scrollIntoView({

        behavior:"smooth",

        block:"center"

    });

}

/* ==========================
   Gift Box
========================== */

function initializeGiftBox(){

    const gift=document.getElementById("giftBox");

    if(!gift) return;

    gift.addEventListener("click",openGift);

}

function openGift(){

    if(giftOpened) return;

    giftOpened=true;

    const gift=document.getElementById("giftBox");

    gift.animate([

        {

            transform:"scale(1)"

        },

        {

            transform:"scale(1.25) rotate(10deg)"

        },

        {

            transform:"scale(.9)"

        }

    ],{

        duration:900,

        easing:"ease-in-out"

    });

    setTimeout(showFinalMessage,700);

}

/* ==========================
   Final Surprise
========================== */

function showFinalMessage(){

    const overlay=document.createElement("div");

    overlay.style.position="fixed";
    overlay.style.inset="0";
    overlay.style.background="rgba(10,0,20,.95)";
    overlay.style.display="flex";
    overlay.style.flexDirection="column";
    overlay.style.justifyContent="center";
    overlay.style.alignItems="center";
    overlay.style.zIndex="999999";
    overlay.style.padding="30px";
    overlay.style.textAlign="center";

    overlay.innerHTML=`

        <div style="
        font-size:90px;
        animation:pulse 2s infinite;
        ">
            💜
        </div>

        <h1 style="
        font-family:'Great Vibes';
        font-size:70px;
        color:white;
        margin:20px 0;
        ">
            Happy Birthday
        </h1>

        <h2 style="
        font-family:'Great Vibes';
        color:#FFD6EC;
        margin-bottom:20px;
        ">
            Guddu ❤️
        </h2>

        <p style="
        max-width:700px;
        color:white;
        line-height:1.9;
        font-size:20px;
        ">

        Every moment with you is a beautiful memory.
        Thank you for bringing love, happiness and warmth into my life.

        <br><br>

        May this birthday bring endless smiles,
        wonderful adventures,
        and all the happiness you truly deserve.

        <br><br>

        <strong>
        Forever Yours,
        <br>
        Ashish ❤️
        </strong>

        </p>

        <p style="
        margin-top:30px;
        color:rgba(255,255,255,.6);
        font-size:14px;
        ">
        (tap anywhere to close)
        </p>

    `;

    overlay.addEventListener("click", () => overlay.remove());

    document.body.appendChild(overlay);

    createHeartRain();

}

/* ==========================
   Heart Rain
========================== */

function createHeartRain(){

    setInterval(()=>{

        const heart=document.createElement("div");

        heart.innerHTML="💜";

        heart.style.position="fixed";

        heart.style.left=Math.random()*100+"vw";

        heart.style.top="-40px";

        heart.style.fontSize=(20+Math.random()*30)+"px";

        heart.style.pointerEvents="none";

        heart.style.zIndex="999999";

        document.body.appendChild(heart);

        heart.animate([

            {

                transform:"translateY(0)"

            },

            {

                transform:
                `translateY(${window.innerHeight+100}px)
                 rotate(${Math.random()*720}deg)`

            }

        ],{

            duration:6000+Math.random()*3000,

            easing:"linear"

        });

        setTimeout(()=>{

            heart.remove();

        },9000);

    },300);

}

})();
