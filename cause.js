 // ══════════════════════════════
//  🎵 BACKGROUND MUSIC
// ══════════════════════════════
const bgMusic = document.getElementById('bg-music');

function applyMusicState() {
    bgMusic.volume = 0.4;
    bgMusic.play().catch(() => {});
}

// Resume from saved position (cross-page continuity)
bgMusic.currentTime = parseFloat(sessionStorage.getItem('musicTime') || '0');

// Save playback time before leaving page
window.addEventListener('beforeunload', () => {
    sessionStorage.setItem('musicTime', bgMusic.currentTime);
});

// Start on first user interaction
document.addEventListener('click', function startOnce() {
    applyMusicState();
    document.removeEventListener('click', startOnce);
}, { once: true });

applyMusicState();


// ══════════════════════════════
//  💖 REASONS DATABASE
// ══════════════════════════════
const reasons = [
    {
        text: "You're such a kind and wonderful person, and I feel lucky to share such a good bond with you. 💖",
        emoji: "🌟",
        gif: "img/gif1.gif"
    },
    {
        text: "May your day be filled with love, laughter, and endless joy. 🌸",
        emoji: "💗",
        gif: "img/gif2.gif"
    },
    {
        text: "Wishing you success, happiness, and everything your heart desires. ✨",
        emoji: "💕",
        gif: "img/gif1.gif"
    },
    {
        text: "Stay the amazing girl you are—always spreading positivity around. Have the happiest year ahead! 🥳",
        emoji: "🌟",
        gif: "img/gif2.gif"
    }
];


// ══════════════════════════════
//  🗂️ STATE
// ══════════════════════════════
let currentReasonIndex = 0;
let isTransitioning    = false;

const reasonsContainer = document.getElementById('reasons-container');
const shuffleButton    = document.querySelector('.shuffle-button');
const reasonCounter    = document.querySelector('.reason-counter');


// ══════════════════════════════
//  🃏 CREATE REASON CARD
// ══════════════════════════════
function createReasonCard(reason) {
    const card = document.createElement('div');
    card.className = 'reason-card';

    const text = document.createElement('div');
    text.className = 'reason-text';
    text.innerHTML = `${reason.emoji} ${reason.text}`;

    const gifOverlay = document.createElement('div');
    gifOverlay.className = 'gif-overlay';
    gifOverlay.innerHTML = `<img src="${reason.gif}" alt="Memory">`;

    card.appendChild(text);
    card.appendChild(gifOverlay);

    // Tap to toggle GIF on mobile
    card.addEventListener('click', () => {
        const overlay = card.querySelector('.gif-overlay');
        overlay.style.opacity = overlay.style.opacity === "1" ? "0" : "1";
    });

    gsap.from(card, {
        opacity: 0,
        y: 50,
        duration: 0.5,
        ease: "back.out"
    });

    return card;
}


// ══════════════════════════════
//  📖 DISPLAY NEXT REASON
// ══════════════════════════════
function displayNewReason() {
    if (isTransitioning) return;
    isTransitioning = true;

    if (currentReasonIndex < reasons.length) {
        const card = createReasonCard(reasons[currentReasonIndex]);
        reasonsContainer.appendChild(card);

        reasonCounter.textContent = `Reason ${currentReasonIndex + 1} of ${reasons.length}`;
        currentReasonIndex++;

        // All reasons shown → switch to "Enter Storylane" mode
        if (currentReasonIndex === reasons.length) {
            gsap.to(shuffleButton, {
                scale: 1.1,
                duration: 0.5,
                ease: "elastic.out",
                onComplete: () => {
                    shuffleButton.textContent = "Enter Our Storylane 💫";
                    shuffleButton.classList.add('story-mode');
                    shuffleButton.addEventListener('click', () => {
                        gsap.to('body', {
                            opacity: 0,
                            duration: 1,
                            onComplete: () => {
                                window.location.href = 'last.html';
                            }
                        });
                    }, { once: true });
                }
            });
        }

        createFloatingElement();

        setTimeout(() => { isTransitioning = false; }, 500);
    }
}


// ══════════════════════════════
//  🔘 SHUFFLE BUTTON CLICK
// ══════════════════════════════
shuffleButton.addEventListener('click', () => {
    gsap.to(shuffleButton, {
        scale: 0.9,
        duration: 0.1,
        yoyo: true,
        repeat: 1
    });
    displayNewReason();
});


// ══════════════════════════════
//  ✨ FLOATING ELEMENTS
// ══════════════════════════════
function createFloatingElement() {
    const emojis  = ['🌸', '✨', '💖', '🦋', '⭐'];
    const element = document.createElement('div');
    element.className   = 'floating';
    element.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    element.style.left  = Math.random() * window.innerWidth + 'px';
    element.style.top   = Math.random() * window.innerHeight + 'px';
    element.style.fontSize = (Math.random() * 20 + 10) + 'px';
    document.body.appendChild(element);

    gsap.to(element, {
        y: -500,
        duration: Math.random() * 10 + 10,
        opacity: 0,
        onComplete: () => element.remove()
    });
}

setInterval(createFloatingElement, 3000);


// ══════════════════════════════
//  🖱️ CUSTOM CURSOR
// ══════════════════════════════
const cursor = document.querySelector('.custom-cursor');
document.addEventListener('mousemove', (e) => {
    gsap.to(cursor, {
        x: e.clientX - 15,
        y: e.clientY - 15,
        duration: 0.2
    });
});