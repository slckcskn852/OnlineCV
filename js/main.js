// Theme Toggle Functionality
const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');

function switchTheme(e) {
    if (e.target.checked) {
        document.body.classList.add('light-theme');
        localStorage.setItem('theme', 'light');
    } else {
        document.body.classList.remove('light-theme');
        localStorage.setItem('theme', 'dark');
    }    
}

toggleSwitch.addEventListener('change', switchTheme);

// Check for saved theme preference or use default dark theme
const currentTheme = localStorage.getItem('theme');
if (currentTheme) {
    if (currentTheme === 'light') {
        toggleSwitch.checked = true;
        document.body.classList.add('light-theme');
    }
} else {
    // Default to dark theme
    localStorage.setItem('theme', 'dark');
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Initialize ScrollReveal for animations
ScrollReveal().reveal('.glass-card', {
    delay: 200,
    distance: '20px',
    duration: 1000,
    easing: 'cubic-bezier(0.5, 0, 0, 1)',
    interval: 200,
    opacity: 0,
    origin: 'bottom',
    reset: false
});

ScrollReveal().reveal('.section-title', {
    delay: 100,
    distance: '20px',
    duration: 1000,
    easing: 'cubic-bezier(0.5, 0, 0, 1)',
    opacity: 0,
    origin: 'bottom',
    reset: false
});

// Add floating animation to skill items
document.querySelectorAll('.skill-item').forEach(item => {
    item.classList.add('floating');
});

// Form submission handling
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        // Add your form submission logic here
        alert('Thank you for your message! I will get back to you soon.');
        this.reset();
    });
}

// Add hover effect to project cards
document.querySelectorAll('.project-card, .experience-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});
