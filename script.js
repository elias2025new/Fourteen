// Slide Navigation System
let currentSlide = 0;
const sections = document.querySelectorAll('.section');
const totalSlides = sections.length;

// Create navigation dots
const navDotsContainer = document.getElementById('navDots');
for (let i = 0; i < totalSlides; i++) {
    const dot = document.createElement('div');
    dot.classList.add('nav-dot');
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToSlide(i));
    navDotsContainer.appendChild(dot);
}

// Update navigation dots
function updateDots() {
    const dots = document.querySelectorAll('.nav-dot');
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
    });
}

// Go to specific slide
function goToSlide(slideIndex) {
    if (slideIndex < 0 || slideIndex >= totalSlides) return;

    // Remove active from all sections
    sections.forEach(section => {
        section.classList.remove('active');
    });

    // Add active to current section
    sections[slideIndex].classList.add('active');

    // Fade in content
    setTimeout(() => {
        sections[slideIndex].querySelector('.content').classList.add('fade-in');
    }, 100);

    currentSlide = slideIndex;
    updateDots();

    // Hide swipe hint after first interaction
    if (currentSlide > 0) {
        document.getElementById('swipeHint').style.display = 'none';
    }
}

// Next slide
function nextSlide() {
    if (currentSlide < totalSlides - 1) {
        goToSlide(currentSlide + 1);
    }
}

// Previous slide
function prevSlide() {
    if (currentSlide > 0) {
        goToSlide(currentSlide - 1);
    }
}

// Swipe detection
let touchStartX = 0;
let touchEndX = 0;
let touchStartY = 0;
let touchEndY = 0;

document.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
    touchStartY = e.changedTouches[0].screenY;
});

document.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    touchEndY = e.changedTouches[0].screenY;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 80;
    const diffX = touchStartX - touchEndX;
    const diffY = touchStartY - touchEndY;

    // Check if swipe started inside any horizontal scroll area
    const gallery = document.querySelector('.gallery');
    const storySlideshow = document.querySelector('.story-slideshow');

    const isInsideGallery = gallery && gallery.contains(document.elementFromPoint(touchStartX, touchStartY));
    const isInsideStory = storySlideshow && storySlideshow.contains(document.elementFromPoint(touchStartX, touchStartY));

    const activeScroller = isInsideGallery ? gallery : (isInsideStory ? storySlideshow : null);

    if (Math.abs(diffX) > Math.abs(diffY)) {
        if (Math.abs(diffX) > swipeThreshold) {
            if (activeScroller) {
                // If inside a horizontal scroll area, only change slide if we're at the edges
                if (diffX > 0) {
                    // Swiping left (trying to go next)
                    const isAtEnd = activeScroller.scrollLeft + activeScroller.clientWidth >= activeScroller.scrollWidth - 20;
                    if (isAtEnd) nextSlide();
                } else {
                    // Swiping right (trying to go back)
                    const isAtStart = activeScroller.scrollLeft <= 20;
                    if (isAtStart) prevSlide();
                }
            } else {
                // Not in a scroll area, allow normal section change
                if (diffX > 0) {
                    nextSlide();
                } else {
                    prevSlide();
                }
            }
        }
    } else {
        // Vertical swipe - block section change if inside any horizontal scroll area
        const scrollerInside = document.elementFromPoint(touchStartX, touchStartY).closest('.gallery, .slideshow');
        if (!scrollerInside && Math.abs(diffY) > swipeThreshold) {
            if (diffY > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
        }
    }
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        nextSlide();
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        prevSlide();
    }
});

// Floating Hearts Animation
function createHeart() {
    const heartsContainer = document.getElementById('heartsContainer');
    const heart = document.createElement('div');
    heart.classList.add('heart');
    heart.innerHTML = '❤️';
    heart.style.left = Math.random() * 100 + '%';
    heart.style.animationDuration = (Math.random() * 3 + 5) + 's';
    heart.style.animationDelay = Math.random() * 2 + 's';
    heartsContainer.appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, 8000);
}

// Create hearts continuously
setInterval(createHeart, 800);

// Initial hearts
for (let i = 0; i < 15; i++) {
    setTimeout(createHeart, i * 200);
}

// First section fades in immediately
window.addEventListener('load', () => {
    document.querySelector('#section1 .content').classList.add('fade-in');
});

// Update scrollToNext function to use slide navigation
function scrollToNext() {
    nextSlide();
}

// Flip Card Function
function flipCard(card) {
    card.classList.toggle('flipped');
}

// Question Section Animation
let questionShown = false;

// Modified to work with slide navigation
function checkQuestionSection() {
    if (currentSlide === 4 && !questionShown) {
        questionShown = true;
        setTimeout(() => {
            document.getElementById('typingDots').style.display = 'none';
            document.getElementById('questionReveal').classList.add('show');
        }, 3000);
    }
}

// Call this whenever slide changes
const originalGoToSlide = goToSlide;
goToSlide = function (slideIndex) {
    originalGoToSlide(slideIndex);
    checkQuestionSection();
};

// Handle YES button
function handleYes() {
    document.getElementById('questionReveal').style.display = 'none';
    document.getElementById('finalMessage').classList.add('show');
    createConfetti();
}

// Handle Maybe button - moves away playfully
let maybeClickCount = 0;
function handleMaybe() {
    const maybeButton = document.getElementById('maybeButton');
    const memeOverlay = document.getElementById('memeOverlay');
    const memeSound = document.getElementById('memeSound');

    // Play sound
    memeSound.currentTime = 0;
    memeSound.play().catch(e => console.log("Sound play blocked"));

    // Show meme popup
    memeOverlay.classList.remove('active');
    void memeOverlay.offsetWidth; // Trigger reflow
    memeOverlay.classList.add('active');

    setTimeout(() => {
        memeOverlay.classList.remove('active');
    }, 1500);

    maybeClickCount++;

    maybeButton.classList.add('move-away');

    setTimeout(() => {
        maybeButton.classList.remove('move-away');
    }, 300);

    // After 3 attempts, make it harder
    if (maybeClickCount >= 3) {
        maybeButton.style.transform = `translate(${Math.random() * 40 - 20}px, ${Math.random() * 40 - 20}px)`;
    }
}

// Confetti Animation
function createConfetti() {
    const canvas = document.getElementById('confettiCanvas');
    canvas.classList.add('active');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const confettiPieces = [];
    const colors = ['#ff4d6d', '#ffd6e0', '#ff758f', '#ffc2d1', '#ffffff'];

    class ConfettiPiece {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = -20;
            this.size = Math.random() * 8 + 5;
            this.speedY = Math.random() * 3 + 2;
            this.speedX = Math.random() * 2 - 1;
            this.color = colors[Math.floor(Math.random() * colors.length)];
            this.rotation = Math.random() * 360;
            this.rotationSpeed = Math.random() * 10 - 5;
        }

        update() {
            this.y += this.speedY;
            this.x += this.speedX;
            this.rotation += this.rotationSpeed;

            if (this.y > canvas.height) {
                return false;
            }
            return true;
        }

        draw() {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.rotation * Math.PI / 180);
            ctx.fillStyle = this.color;

            // Draw heart shape
            ctx.beginPath();
            ctx.arc(-this.size / 4, -this.size / 4, this.size / 4, 0, Math.PI * 2);
            ctx.arc(this.size / 4, -this.size / 4, this.size / 4, 0, Math.PI * 2);
            ctx.moveTo(-this.size / 2, 0);
            ctx.lineTo(0, this.size / 2);
            ctx.lineTo(this.size / 2, 0);
            ctx.closePath();
            ctx.fill();

            ctx.restore();
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Add new confetti
        if (confettiPieces.length < 150) {
            for (let i = 0; i < 5; i++) {
                confettiPieces.push(new ConfettiPiece());
            }
        }

        // Update and draw confetti
        for (let i = confettiPieces.length - 1; i >= 0; i--) {
            if (confettiPieces[i].update()) {
                confettiPieces[i].draw();
            } else {
                confettiPieces.splice(i, 1);
            }
        }

        if (confettiPieces.length > 0) {
            requestAnimationFrame(animate);
        } else {
            canvas.classList.remove('active');
        }
    }

    animate();
}

// Prevent zoom on double tap (iOS)
let lastTouchEnd = 0;
document.addEventListener('touchend', (event) => {
    const now = (new Date()).getTime();
    if (now - lastTouchEnd <= 300) {
        event.preventDefault();
    }
    lastTouchEnd = now;
}, false);
