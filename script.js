// Fireworks Animation
const fireworksCanvas = document.getElementById('fireworks');
const fwCtx = fireworksCanvas.getContext('2d');
fireworksCanvas.width = window.innerWidth;
fireworksCanvas.height = window.innerHeight;

class Firework {
    constructor() {
        this.x = Math.random() * fireworksCanvas.width;
        this.y = fireworksCanvas.height;
        this.targetY = Math.random() * fireworksCanvas.height * 0.4;
        this.speed = 5;
        this.particles = [];
        this.exploded = false;
        this.color = ['#ff1493', '#ffd700', '#ff6b35', '#00ff00', '#00ffff', '#ff69b4'][Math.floor(Math.random() * 6)];
    }
    
    update() {
        if (!this.exploded) {
            this.y -= this.speed;
            if (this.y <= this.targetY) {
                this.explode();
            }
        } else {
            this.particles.forEach((particle, index) => {
                particle.update();
                if (particle.alpha <= 0) {
                    this.particles.splice(index, 1);
                }
            });
        }
    }
    
    explode() {
        this.exploded = true;
        for (let i = 0; i < 80; i++) {
            this.particles.push(new Particle(this.x, this.y, this.color));
        }
    }
    
    draw() {
        if (!this.exploded) {
            fwCtx.shadowBlur = 10;
            fwCtx.shadowColor = this.color;
            fwCtx.beginPath();
            fwCtx.arc(this.x, this.y, 4, 0, Math.PI * 2);
            fwCtx.fillStyle = this.color;
            fwCtx.fill();
            fwCtx.shadowBlur = 0;
        } else {
            this.particles.forEach(particle => particle.draw());
        }
    }
}

class Particle {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.velocity = {
            x: (Math.random() - 0.5) * 10,
            y: (Math.random() - 0.5) * 10
        };
        this.alpha = 1;
        this.decay = Math.random() * 0.015 + 0.008;
        this.size = Math.random() * 3 + 2;
    }
    
    update() {
        this.velocity.y += 0.15;
        this.x += this.velocity.x;
        this.y += this.velocity.y;
        this.alpha -= this.decay;
    }
    
    draw() {
        fwCtx.save();
        fwCtx.globalAlpha = this.alpha;
        fwCtx.shadowBlur = 15;
        fwCtx.shadowColor = this.color;
        fwCtx.beginPath();
        fwCtx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        fwCtx.fillStyle = this.color;
        fwCtx.fill();
        fwCtx.restore();
    }
}

let fireworks = [];
let fireworkInterval;

function animateFireworks() {
    fwCtx.clearRect(0, 0, fireworksCanvas.width, fireworksCanvas.height);
    
    fireworks.forEach((firework, index) => {
        firework.update();
        firework.draw();
        
        if (firework.exploded && firework.particles.length === 0) {
            fireworks.splice(index, 1);
        }
    });
    
    requestAnimationFrame(animateFireworks);
}

// Start fireworks on page load
function startFireworks() {
    fireworkInterval = setInterval(() => {
        fireworks.push(new Firework());
    }, 300);
    
    // Stop after 8 seconds
    setTimeout(() => {
        clearInterval(fireworkInterval);
        setTimeout(() => {
            fwCtx.clearRect(0, 0, fireworksCanvas.width, fireworksCanvas.height);
        }, 3000);
    }, 8000);
}

animateFireworks();
startFireworks();

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
for (let i = 0; i < 30; i++) {
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

setInterval(createHeart, 1500);

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

setInterval(createSparkle, 2000);

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

setInterval(createBalloon, 2500);

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
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
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
    for (let i = 0; i < 20; i++) {
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

// Music Toggle - Autoplay with Mute/Unmute
const musicToggle = document.getElementById('musicToggle');
const bgMusic = document.getElementById('bgMusic');
let isMuted = false;

// Try to autoplay when page loads
window.addEventListener('load', () => {
    bgMusic.play().then(() => {
        // Autoplay successful
        musicToggle.textContent = '🔊';
        isMuted = false;
    }).catch(err => {
        // Autoplay blocked by browser, start muted
        console.log('Autoplay blocked, user needs to interact first');
        bgMusic.muted = true;
        musicToggle.textContent = '🔇';
        isMuted = true;
    });
});

// Mute/Unmute toggle
musicToggle.addEventListener('click', () => {
    if (isMuted) {
        bgMusic.muted = false;
        bgMusic.play().catch(err => console.log('Play failed:', err));
        musicToggle.textContent = '🔊';
        isMuted = false;
    } else {
        bgMusic.muted = true;
        musicToggle.textContent = '🔇';
        isMuted = true;
    }
});

// Window resize handler
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    fireworksCanvas.width = window.innerWidth;
    fireworksCanvas.height = window.innerHeight;
});

// Add parallax effect
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.hero-content');
    parallaxElements.forEach(el => {
        el.style.transform = `translateY(${scrolled * 0.5}px)`;
    });
    
    // Hide scroll indicator when scrolling
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        if (scrolled > 100) {
            scrollIndicator.style.opacity = '0';
            scrollIndicator.style.pointerEvents = 'none';
        } else {
            scrollIndicator.style.opacity = '1';
            scrollIndicator.style.pointerEvents = 'all';
        }
    }
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
                        for (let i = 0; i < 40; i++) {
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

// Photo Gallery Scroll Animation - Clean & Clear
const scrollAnimateElements = document.querySelectorAll('.scroll-animate');

function animateOnScroll() {
    scrollAnimateElements.forEach((element, index) => {
        const rect = element.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const elementTop = rect.top;
        const elementHeight = rect.height;
        
        // Calculate when element is in viewport
        const scrollProgress = Math.max(0, Math.min(1, 
            (windowHeight - elementTop) / (windowHeight + elementHeight)
        ));
        
        let rotation = 0;
        let translateX = 0;
        let translateY = 0;
        let scale = 1;
        let opacity = 1;
        
        // Smooth entrance animations
        if (scrollProgress < 0.3) {
            // Before entering viewport
            opacity = 0;
            scale = 0.8;
            
            if (index === 0) {
                translateX = -100;
                rotation = -15;
            } else if (index === 1) {
                translateY = 100;
                rotation = 0;
            } else if (index === 2) {
                translateX = 100;
                rotation = 15;
            }
        } else if (scrollProgress >= 0.3 && scrollProgress <= 0.7) {
            // Animating into center
            const progress = (scrollProgress - 0.3) / 0.4; // 0 to 1
            opacity = progress;
            scale = 0.8 + (progress * 0.2);
            
            if (index === 0) {
                translateX = -100 * (1 - progress);
                rotation = -15 * (1 - progress);
            } else if (index === 1) {
                translateY = 100 * (1 - progress);
            } else if (index === 2) {
                translateX = 100 * (1 - progress);
                rotation = 15 * (1 - progress);
            }
        } else {
            // Centered and visible
            opacity = 1;
            scale = 1;
            translateX = 0;
            translateY = 0;
            rotation = 0;
        }
        
        // Apply smooth transforms
        element.style.transform = `
            translateX(${translateX}px) 
            translateY(${translateY}px) 
            rotate(${rotation}deg) 
            scale(${scale})
        `;
        element.style.opacity = opacity;
    });
}

// Smooth scroll animation with requestAnimationFrame
let ticking = false;

function requestTick() {
    if (!ticking) {
        requestAnimationFrame(() => {
            animateOnScroll();
            ticking = false;
        });
        ticking = true;
    }
}

// Run on scroll with throttling
window.addEventListener('scroll', requestTick);
// Run on load
animateOnScroll();

// Blow the Candles Feature - Simple Click Version
const blowButton = document.getElementById('blowButton');
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
    cakeText.textContent = '🎉 Wish made! 🎉';
    wishMessage.classList.add('show');
    
    // Celebration confetti
    for (let i = 0; i < 50; i++) {
        confettiArray.push(new Confetti());
    }
    
    // Create floating hearts
    for (let i = 0; i < 15; i++) {
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
