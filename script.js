// ══════════════════════════════
//  🎵 BACKGROUND MUSIC
// ══════════════════════════════
const bgMusic = document.getElementById('bg-music');

function applyMusicState() {
    bgMusic.volume = 0.4;
    bgMusic.play().catch(() => {});
}

if (sessionStorage.getItem('musicRestart') === 'true') {
    sessionStorage.removeItem('musicRestart');
    sessionStorage.removeItem('musicTime');
    bgMusic.currentTime = 0;
} else {
    bgMusic.currentTime = parseFloat(sessionStorage.getItem('musicTime') || '0');
}

window.addEventListener('beforeunload', () => {
    sessionStorage.setItem('musicTime', bgMusic.currentTime);
});

document.addEventListener('click', function startOnce() {
    applyMusicState();
    document.removeEventListener('click', startOnce);
}, { once: true });

applyMusicState();
// ══════════════════════════════
//  ✍️ TYPEWRITER GREETING (Updated with your long text)
// ══════════════════════════════
const greetingText = `Happy 22nd birthday Tishu 💕,

In life you are my once-in-a-lifetime soul.... (I always feel it all the same. You were not just a best friend to me you are home, my heart, my calm in chaos forever fav person . wishing your all dreams will come true having a bright furure always grow with good health and had made free of all the problems that make you suffer. Even from distance, I'm silently celebrating you, like I always will.

I miss your voice, your laugh, the way we just understood and make stand for each other. If I could have one wish today-it wouldn't be for me that as I always failed to make your heart happy, your soul is at peace, you deserves all the happiness ,till don't coming to you not because I never able to stop caring , but because felt I cared too much  that makes you face any problems.i'm allways there for you  ,
 
But silence hasn't quieted the pain that lasts for a long time and distance hasn't dimmed the love.l wanted you to be free from the weight you are carrying.

and also the truth is... I still care, I still miss you every minute , and I still believe that what

we shared was real. No matter where will life takes us, you'll always be my forever person. Happy birthday

Always here, always wishing the best for you.")`;

const greetingElement = document.querySelector('.greeting');
let charIndex = 0;

function typeGreeting() {
    if (greetingElement && charIndex < greetingText.length) {
        // textContent use karein taaki line breaks dikhein
        greetingElement.textContent += greetingText.charAt(charIndex);
        charIndex++;
        setTimeout(typeGreeting, 50); // Typing speed
    }
}

// Function ko sahi waqt par call karein
window.addEventListener('load', typeGreeting);

// ══════════════════════════════
//  🌸 FLOATING EMOJIS
// ══════════════════════════════
const floatingElements = ['💖', '✨', '🌸', '💫', '💕', '🧿'];

function createFloating() {
    const element = document.createElement('div');
    element.className = 'floating';
    element.textContent = floatingElements[Math.floor(Math.random() * floatingElements.length)];
    element.style.left = Math.random() * 100 + 'vw';
    element.style.top = Math.random() * 100 + 'vh';
    element.style.fontSize = (Math.random() * 20 + 20) + 'px';
    document.body.appendChild(element);

    gsap.to(element, {
        y: -500,
        x: Math.random() * 100 - 50,
        rotation: Math.random() * 360,
        duration: Math.random() * 5 + 5,
        opacity: 1,
        ease: "none",
        onComplete: () => element.remove()
    });
}

// ══════════════════════════════
//  🚀 INIT ON LOAD
// ══════════════════════════════
window.addEventListener('load', () => {
    gsap.to('h1', { opacity: 1, duration: 1, y: 20, ease: "bounce.out" });
    gsap.to('.cta-button', { opacity: 1, duration: 1, y: -20, ease: "back.out" });
    
    typeGreeting();
    setInterval(createFloating, 1000);
});

// ══════════════════════════════
//  🔘 BUTTON ACTIONS
// ══════════════════════════════
document.querySelectorAll('.cta-button').forEach(button => {
    button.addEventListener('mouseenter', () => gsap.to(button, { scale: 1.1, duration: 0.3 }));
    button.addEventListener('mouseleave', () => gsap.to(button, { scale: 1, duration: 0.3 }));
    button.addEventListener('click', () => {
        gsap.to('body', {
            opacity: 0,
            duration: 1,
            onComplete: () => { window.location.href = 'cause.html'; }
        });
    });
});

// ══════════════════════════════
//  ❤️ CURSOR HEART TRAIL
// ══════════════════════════════
let lastTime = 0;
document.addEventListener("mousemove", function (e) {
    const now = Date.now();
    if (now - lastTime < 80) return;
    lastTime = now;

    const heart = document.createElement("div");
    heart.className = "cursor-heart";
    heart.innerHTML = "❤️";
    heart.style.left = e.clientX + "px";
    heart.style.top = e.clientY + "px";
    document.body.appendChild(heart);

    setTimeout(() => {
        heart.style.opacity = "0";
        heart.style.transform = `translate(-50%, -${60 + Math.random() * 20}%) scale(1.2)`;
    }, 50);

    setTimeout(() => heart.remove(), 1000);
});