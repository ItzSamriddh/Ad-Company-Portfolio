// 1. SELECT ELEMENTS (Only once)
let slideIndex = 0;
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
const heroContent = document.querySelector('.hero-content');

// 2. CAROUSEL LOGIC
function showSlides(n) {
    // Wrap around logic
    if (n >= slides.length) slideIndex = 0;
    else if (n < 0) slideIndex = slides.length - 1;
    else slideIndex = n;

    // Remove active class from everyone
    slides.forEach(s => s.classList.remove('active'));
    dots.forEach(d => d.classList.remove('active'));

    // Add active class to the current one
    if (slides[slideIndex]) slides[slideIndex].classList.add('active');
    if (dots[slideIndex]) dots[slideIndex].classList.add('active');
}

// Arrow click logic
function changeSlide(n) {
    showSlides(slideIndex + n);
}

// Dot click logic
function currentSlide(n) {
    showSlides(n);
}

// Auto-rotate every 5 seconds (Only one timer needed)
if (slides.length > 0) {
    setInterval(() => {
        changeSlide(1);
    }, 3000);
}

// 3. HOME BUTTON SMOOTH SCROLL
const homeLink = document.querySelector('a[href="#home"]');
if (homeLink) {
    homeLink.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// 4. HERO SECTION SCROLL EFFECTS
window.addEventListener('scroll', function() {
    if (!heroContent) return;

    const scrollPosition = window.scrollY;

    if (scrollPosition <= 400) {
        let opacityValue = 1 - (scrollPosition / 350);
        let moveValue = scrollPosition * 0.3; 
        
        heroContent.style.opacity = Math.max(opacityValue, 0);
        heroContent.style.transform = `translateY(${moveValue}px)`;
    }
});
function showSlides(n) {
    // 1. Identify the current active slide to make it "vanish"
    const currentActive = document.querySelector('.slide.active');
    if (currentActive) {
        currentActive.classList.remove('active');
        currentActive.style.opacity = "0";
        currentActive.style.transform = "scale(1.1) translateX(-100px)"; // "Vanishing" movement
    }

    // 2. Calculate the next index
    if (n >= slides.length) slideIndex = 0;
    else if (n < 0) slideIndex = slides.length - 1;
    else slideIndex = n;

    // 3. Reset all slides styles before showing the next one
    slides.forEach((s, index) => {
        if (index !== slideIndex) {
            s.classList.remove('active');
            // Reset position for slides that aren't the new active one
            s.style.transform = "scale(0.8) translateX(100px)"; 
            s.style.opacity = "0";
        }
    });

    // 4. Activate the new slide
    setTimeout(() => {
        slides[slideIndex].classList.add('active');
        // Clear manual styles to let the CSS class take over
        slides[slideIndex].style.transform = ""; 
        slides[slideIndex].style.opacity = "";
        
        // Update dots
        dots.forEach(d => d.classList.remove('active'));
        if (dots[slideIndex]) dots[slideIndex].classList.add('active');
    }, 50); // Small delay to trigger the transition
}