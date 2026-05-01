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
 (The day that my soul always excited for'' today is your special day and i want to say you how much you mean to me and always hold the special place in my heart that cares for you. I wish you all the happiness in the world, not just today but every day of your life. 

May God grant you health, career growth, and the power to stay strong against any problem. i know you understands i dont use to say much but feels everyhting around too deeply .wish your heart becomes so full of happiness that it heals all the parts of you that once felt hurt you are a true warrior. Never forget how much energy you hold within you; no problem is too big and no dream is too far away.

I am so thankful for you—thank you for coming into my life. Thank you for making me smile, for understanding me, and for standing by my side in every situation. You were there at my worst, even when I was unable to handle myself idont trust anyone easily but i always trust you close eyed . I am truly thankful that the universe sent you and that I found you. Even the smallest moments spent with you are the best moments of my entire life.

You are the beautiful soul Ill never get tired of falling for, over and over again. You are not just a best friend; you are home to my soul. Regardless of any labels, you have always had my heart. You are a once-in-a-lifetime soul, and you will always be my forever person.

Sometimes life brings challenges, but I wish for you to stay strong and resilient . If I could, I would absorb all your pain and return it to you as love. For as long as I am here, you are never alone. I am always there for you, always stay together  no matter how hard situation will go  where life takes us. Even if the world doesn't clap for you, I always will. 

With all my devotion and with my whole heart—past, present, and future—I am always grateful for you. I choose you and i'll choose you over and over again, without pause, without doubt, and in every heartbeat. I'll always keep choosing you.

Happy Birthday... I am always here, always wishing the best for you.)`;

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
