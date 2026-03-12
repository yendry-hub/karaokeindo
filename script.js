// ========== THEME TOGGLE FUNCTIONALITY ==========
document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    
    // Check if elements exist
    if (!themeToggle) {
        console.error('Theme toggle button not found!');
        return;
    }
    
    const themeIcon = themeToggle.querySelector('i');
    if (!themeIcon) {
        console.error('Theme toggle icon not found!');
        return;
    }
    
    // Load saved theme from localStorage
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Set initial theme
    if (savedTheme) {
        body.setAttribute('data-theme', savedTheme);
        updateThemeIcon(savedTheme, themeIcon);
    } else if (prefersDark) {
        body.setAttribute('data-theme', 'dark');
        updateThemeIcon('dark', themeIcon);
    }
    
    // Toggle theme on click
    themeToggle.addEventListener('click', function() {
        const currentTheme = body.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme, themeIcon);
        
        console.log('Theme changed to:', newTheme);
    });
    
    // Update icon based on theme
    function updateThemeIcon(theme, icon) {
        if (theme === 'dark') {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
    }
});


// ========== HERO IMAGE SLIDER ==========
let imageIndex = 1;
let imageInterval;

document.addEventListener('DOMContentLoaded', function() {
    const sliderImages = document.getElementsByClassName('slider-image');
    if (sliderImages.length > 0) {
        showImage(imageIndex);
        startAutoImage();
    }
});

function startAutoImage() {
    imageInterval = setInterval(function() {
        changeImage(1);
    }, 3000);
}

function resetAutoImage() {
    clearInterval(imageInterval);
    startAutoImage();
}

function changeImage(n) {
    showImage(imageIndex += n);
    resetAutoImage();
}

function currentImage(n) {
    showImage(imageIndex = n);
    resetAutoImage();
}

function showImage(n) {
    const images = document.getElementsByClassName('slider-image');
    const dotsContainer = document.getElementsByClassName('image-slider-dots')[0];
    const dots = dotsContainer ? dotsContainer.getElementsByClassName('dot') : [];
    
    if (images.length === 0) return;
    
    if (n > images.length) { imageIndex = 1; }
    if (n < 1) { imageIndex = images.length; }
    
    // Hide all images
    for (let i = 0; i < images.length; i++) {
        images[i].classList.remove('active');
    }
    
    // Remove active from all dots
    for (let i = 0; i < dots.length; i++) {
        dots[i].classList.remove('active');
    }
    
    // Show current image and activate dot
    images[imageIndex - 1].classList.add('active');
    if (dots[imageIndex - 1]) {
        dots[imageIndex - 1].classList.add('active');
    }
}

// Pause on hover
const heroImage = document.querySelector('.hero-image');
if (heroImage) {
    heroImage.addEventListener('mouseenter', function() {
        clearInterval(imageInterval);
    });
    
    heroImage.addEventListener('mouseleave', function() {
        startAutoImage();
    });
}


// ========== CONTACT FORM HANDLING (No Redirect) ==========
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const submitBtn = contactForm ? contactForm.querySelector('.submit-btn') : null;
    
    if (contactForm && submitBtn) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Prevent default form submission (stops redirect)
            
            const btnText = submitBtn.querySelector('span');
            const btnIcon = submitBtn.querySelector('i');
            
            // Add loading state
            submitBtn.classList.add('loading');
            if (btnText) {
                btnText.textContent = 'Sending...';
            }
            
            const formData = new FormData(contactForm);
            const formAction = contactForm.action;
            
            // Use fetch to submit without redirect
            fetch(formAction, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest'
                }
            })
            .then(function(response) {
                submitBtn.classList.remove('loading');
                
                if (response.ok) {
                    // Success - Show green button
                    if (btnText) {
                        btnText.textContent = '✓ Sent!';
                    }
                    if (btnIcon) {
                        btnIcon.className = 'fas fa-check';
                    }
                    submitBtn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
                    
                    // Show success alert
                    alert('Thank you! Your message has been sent successfully. We will get back to you soon!');
                    
                    // Reset form
                    contactForm.reset();
                    
                    // Reset button after 3 seconds
                    setTimeout(function() {
                        if (btnText) {
                            btnText.textContent = 'Send Message';
                        }
                        if (btnIcon) {
                            btnIcon.className = 'fas fa-paper-plane';
                        }
                        submitBtn.style.background = '';
                    }, 3000);
                } else {
                    // Error from Formspree
                    if (btnText) {
                        btnText.textContent = 'Send Message';
                    }
                    if (btnIcon) {
                        btnIcon.className = 'fas fa-paper-plane';
                    }
                    
                    response.json().then(function(data) {
                        if (data.errors) {
                            alert('Error: ' + data.errors.map(function(e) { return e.message; }).join(', '));
                        } else {
                            alert('Oops! There was a problem submitting your form. Please try again.');
                        }
                    }).catch(function() {
                        alert('Oops! There was a problem submitting your form. Please try again.');
                    });
                }
            })
            .catch(function(error) {
                submitBtn.classList.remove('loading');
                if (btnText) {
                    btnText.textContent = 'Send Message';
                }
                if (btnIcon) {
                    btnIcon.className = 'fas fa-paper-plane';
                }
                alert('Error: ' + error.message);
            });
        });
    }
});


// ========== MOBILE MENU TOGGLE ==========
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }
});


// ========== SMOOTH SCROLLING ==========
document.addEventListener('DOMContentLoaded', function() {
    const anchors = document.querySelectorAll('a[href^="#"]');
    
    anchors.forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href && href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
                
                // Close mobile menu
                const navMenu = document.querySelector('.nav-menu');
                const hamburger = document.querySelector('.hamburger');
                if (navMenu && hamburger) {
                    navMenu.classList.remove('active');
                    hamburger.classList.remove('active');
                }
            }
        });
    });
});


// ========== NAVBAR SCROLL EFFECT ==========
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.2)';
        } else {
            navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        }
    }
});


// ========== ANIMATION ON SCROLL ==========
document.addEventListener('DOMContentLoaded', function() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Apply animation to feature cards, client cards, gallery items
    const animatedElements = document.querySelectorAll('.feature-card, .client-card, .gallery-item');
    
    animatedElements.forEach(function(el) {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
});


// ========== CONSOLE TEST ==========
console.log('✅ JavaScript is loaded successfully!');
console.log('🎤 KaraokePro Website Ready!');