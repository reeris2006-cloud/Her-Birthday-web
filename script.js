// Cursor Sparkle Effect
const cursorSparkle = document.querySelector('.cursor-sparkle');
let mouseX = 0, mouseY = 0;
let sparkleX = 0, sparkleY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function animateCursor() {
    sparkleX += (mouseX - sparkleX) * 0.2;
    sparkleY += (mouseY - sparkleY) * 0.2;
    cursorSparkle.style.left = sparkleX + 'px';
    cursorSparkle.style.top = sparkleY + 'px';
    requestAnimationFrame(animateCursor);
}
animateCursor();

// Confetti Animation
const canvas = document.getElementById('confetti');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Confetti {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height - canvas.height;
        this.size = Math.random() * 8 + 5;
        this.speedY = Math.random() * 3 + 2;
        this.speedX = Math.random() * 2 - 1;
        this.color = ['#ff69b4', '#ff1493', '#ffd700', '#ff6b35', '#9370db', '#87ceeb'][Math.floor(Math.random() * 6)];
        this.rotation = Math.random() * 360;
        this.rotationSpeed = Math.random() * 5 - 2.5;
    }
    
    update() {
        this.y += this.speedY;
        this.x += this.speedX;
        this.rotation += this.rotationSpeed;
        
        if (this.y > canvas.height) {
            this.y = -10;
            this.x = Math.random() * canvas.width;
        }
    }
    
    draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation * Math.PI / 180);
        ctx.fillStyle = this.color;
        ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);
        ctx.restore();
    }
}

let confettiArray = [];
for (let i = 0; i < 100; i++) {
    confettiArray.push(new Confetti());
}

function animateConfetti() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    confettiArray.forEach(confetti => {
        confetti.update();
        confetti.draw();
    });
    requestAnimationFrame(animateConfetti);
}
animateConfetti();

// Floating Hearts
const heartsContainer = document.querySelector('.floating-hearts');
function createHeart() {
    const heart = document.createElement('div');
    heart.innerHTML = '💕';
    heart.style.position = 'absolute';
    heart.style.left = Math.random() * 100 + '%';
    heart.style.fontSize = Math.random() * 20 + 20 + 'px';
    heart.style.opacity = Math.random() * 0.5 + 0.3;
    heart.style.animation = `floatUp ${Math.random() * 5 + 8}s linear infinite`;
    heart.style.animationDelay = Math.random() * 5 + 's';
    heartsContainer.appendChild(heart);
    
    setTimeout(() => heart.remove(), 13000);
}

setInterval(createHeart, 800);

// Sparkles
const sparklesContainer = document.querySelector('.sparkles');
function createSparkle() {
    const sparkle = document.createElement('div');
    sparkle.innerHTML = '✨';
    sparkle.style.position = 'absolute';
    sparkle.style.left = Math.random() * 100 + '%';
    sparkle.style.top = Math.random() * 100 + '%';
    sparkle.style.fontSize = Math.random() * 15 + 15 + 'px';
    sparkle.style.opacity = '0';
    sparkle.style.animation = 'twinkle 2s ease-in-out infinite';
    sparkle.style.animationDelay = Math.random() * 2 + 's';
    sparklesContainer.appendChild(sparkle);
    
    setTimeout(() => sparkle.remove(), 4000);
}

setInterval(createSparkle, 600);

// Balloons
const balloonsContainer = document.querySelector('.balloons');
function createBalloon() {
    const balloon = document.createElement('div');
    balloon.innerHTML = '🎈';
    balloon.style.position = 'absolute';
    balloon.style.left = Math.random() * 100 + '%';
    balloon.style.fontSize = Math.random() * 25 + 30 + 'px';
    balloon.style.opacity = Math.random() * 0.4 + 0.4;
    balloon.style.animation = `floatUp ${Math.random() * 6 + 10}s linear infinite`;
    balloon.style.animationDelay = Math.random() * 5 + 's';
    balloonsContainer.appendChild(balloon);
    
    setTimeout(() => balloon.remove(), 16000);
}

setInterval(createBalloon, 1500);

// CSS for floating animations
const style = document.createElement('style');
style.textContent = `
    @keyframes floatUp {
        0% {
            transform: translateY(100vh) rotate(0deg);
        }
        100% {
            transform: translateY(-100px) rotate(360deg);
        }
    }
    
    @keyframes twinkle {
        0%, 100% { opacity: 0; transform: scale(0.5); }
        50% { opacity: 1; transform: scale(1.2); }
    }
`;
document.head.appendChild(style);

// Scroll Animation Observer
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.slide-up').forEach(el => observer.observe(el));

// Surprise Button
const surpriseBtn = document.getElementById('surpriseBtn');
const surpriseMessage = document.getElementById('surpriseMessage');

surpriseBtn.addEventListener('click', () => {
    surpriseMessage.classList.add('show');
    surpriseBtn.style.display = 'none';
    
    // Extra confetti burst
    for (let i = 0; i < 50; i++) {
        confettiArray.push(new Confetti());
    }
    
    // Create heart burst
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.innerHTML = '💖';
            heart.style.position = 'fixed';
            heart.style.left = '50%';
            heart.style.top = '50%';
            heart.style.fontSize = '30px';
            heart.style.pointerEvents = 'none';
            heart.style.zIndex = '9999';
            heart.style.animation = `burstHeart ${Math.random() * 1 + 1}s ease-out forwards`;
            heart.style.setProperty('--angle', Math.random() * 360 + 'deg');
            document.body.appendChild(heart);
            
            setTimeout(() => heart.remove(), 1500);
        }, i * 50);
    }
});

// Heart burst animation
const burstStyle = document.createElement('style');
burstStyle.textContent = `
    @keyframes burstHeart {
        0% {
            transform: translate(-50%, -50%) scale(0) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translate(
                calc(-50% + ${Math.random() * 400 - 200}px),
                calc(-50% + ${Math.random() * 400 - 200}px)
            ) scale(1.5) rotate(var(--angle));
            opacity: 0;
        }
    }
`;
document.head.appendChild(burstStyle);

// Music Toggle
const musicToggle = document.getElementById('musicToggle');
const bgMusic = document.getElementById('bgMusic');
let isPlaying = false;

musicToggle.addEventListener('click', () => {
    if (isPlaying) {
        bgMusic.pause();
        musicToggle.textContent = '🎵';
    } else {
        bgMusic.play();
        musicToggle.textContent = '🔇';
    }
    isPlaying = !isPlaying;
});

// Window resize handler
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// Add parallax effect
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.hero-content');
    parallaxElements.forEach(el => {
        el.style.transform = `translateY(${scrolled * 0.5}px)`;
    });
});

// Game Section - Pop the Balloons
const gameArea = document.getElementById('gameArea');
const scoreDisplay = document.getElementById('score');
const resetBtn = document.getElementById('resetGame');

const sweetMessages = [
    "You're amazing! 💖",
    "Keep shining! ✨",
    "You're loved! 💕",
    "So special! 🌟",
    "Beautiful soul! 🌸",
    "Pure magic! 🦋",
    "Incredible! 💝",
    "So blessed! 🌈",
    "Wonderful! 🎀",
    "Simply the best! 💫"
];

const balloonColors = ['🎈', '🎈', '🎈', '🎈', '🎈', '🎈', '🎈', '🎈', '🎈', '🎈'];
let score = 0;
let balloonsPopped = 0;

function createGameBalloons() {
    gameArea.innerHTML = '';
    score = 0;
    balloonsPopped = 0;
    scoreDisplay.textContent = score;
    
    balloonColors.forEach((balloon, index) => {
        const balloonEl = document.createElement('div');
        balloonEl.className = 'game-balloon';
        balloonEl.textContent = balloon;
        balloonEl.style.left = Math.random() * 80 + 5 + '%';
        balloonEl.style.top = Math.random() * 70 + 10 + '%';
        balloonEl.style.animationDelay = Math.random() * 2 + 's';
        
        balloonEl.addEventListener('click', function(e) {
            if (!this.classList.contains('popped')) {
                this.classList.add('popped');
                score++;
                balloonsPopped++;
                scoreDisplay.textContent = score;
                
                // Show sweet message
                const message = document.createElement('div');
                message.className = 'balloon-message';
                message.textContent = sweetMessages[index];
                message.style.left = e.clientX - gameArea.getBoundingClientRect().left + 'px';
                message.style.top = e.clientY - gameArea.getBoundingClientRect().top + 'px';
                gameArea.appendChild(message);
                
                setTimeout(() => message.remove(), 2000);
                
                // Check if all balloons popped
                if (balloonsPopped === 10) {
                    setTimeout(() => {
                        // Victory confetti
                        for (let i = 0; i < 100; i++) {
                            confettiArray.push(new Confetti());
                        }
                        
                        const victoryMsg = document.createElement('div');
                        victoryMsg.className = 'balloon-message';
                        victoryMsg.textContent = '🎉 You did it! Happy Birthday Anu Sree! 🎉';
                        victoryMsg.style.left = '50%';
                        victoryMsg.style.top = '50%';
                        victoryMsg.style.transform = 'translate(-50%, -50%)';
                        victoryMsg.style.fontSize = '1.3rem';
                        victoryMsg.style.padding = '20px 30px';
                        gameArea.appendChild(victoryMsg);
                        
                        setTimeout(() => victoryMsg.remove(), 3000);
                    }, 500);
                }
            }
        });
        
        gameArea.appendChild(balloonEl);
    });
}

resetBtn.addEventListener('click', createGameBalloons);

// Initialize game on load
createGameBalloons();

// Blow the Candles Feature - Simple Click Version
const blowButton = document.getElementById('blowButton');
const blowInstruction = document.getElementById('blowInstruction');
const cakeText = document.getElementById('cakeText');
const wishMessage = document.getElementById('wishMessage');
const candles = document.querySelectorAll('.candle');
let candlesBlown = 0;

// Button click to blow candles
blowButton.addEventListener('click', () => {
    blowButton.disabled = true;
    blowButton.style.opacity = '0.6';
    blowOutAllCandles();
});

function blowOutAllCandles() {
    candles.forEach((candle, index) => {
        setTimeout(() => {
            candle.classList.remove('candle-active');
            candle.classList.add('blown-out');
            createSmoke(candle);
            candlesBlown++;
            
            if (candlesBlown === 3) {
                setTimeout(() => {
                    allCandlesBlown();
                }, 500);
            }
        }, index * 400);
    });
}

function createSmoke(candle) {
    const smoke = document.createElement('div');
    smoke.textContent = '💨';
    smoke.style.position = 'absolute';
    smoke.style.left = candle.offsetLeft + 'px';
    smoke.style.top = candle.offsetTop - 30 + 'px';
    smoke.style.fontSize = '2rem';
    smoke.style.opacity = '1';
    smoke.style.transition = 'all 1s ease-out';
    smoke.style.pointerEvents = 'none';
    smoke.style.zIndex = '20';
    
    document.getElementById('cake').appendChild(smoke);
    
    setTimeout(() => {
        smoke.style.transform = 'translateY(-50px)';
        smoke.style.opacity = '0';
    }, 100);
    
    setTimeout(() => smoke.remove(), 1100);
}

function allCandlesBlown() {
    blowButton.style.display = 'none';
    blowInstruction.style.display = 'none';
    cakeText.textContent = '🎉 Wish made! 🎉';
    wishMessage.classList.add('show');
    
    // Celebration confetti
    for (let i = 0; i < 150; i++) {
        confettiArray.push(new Confetti());
    }
    
    // Create floating hearts
    for (let i = 0; i < 30; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.innerHTML = '💖';
            heart.style.position = 'fixed';
            heart.style.left = Math.random() * 100 + '%';
            heart.style.bottom = '-50px';
            heart.style.fontSize = '2rem';
            heart.style.pointerEvents = 'none';
            heart.style.zIndex = '9999';
            heart.style.animation = 'floatUp 4s ease-out forwards';
            document.body.appendChild(heart);
            
            setTimeout(() => heart.remove(), 4000);
        }, i * 100);
    }
}
