// ===== ENHANCED JAVASCRIPT FOR INTERACT CLUB WEBSITE =====

// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navbar = document.querySelector('.navbar');
const navLinks = document.querySelectorAll('.nav-link');

// ===== MOBILE NAVIGATION =====
if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Prevent body scroll when menu is open
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// ===== SMOOTH SCROLLING =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ===== NAVBAR SCROLL EFFECTS =====
let lastScrollTop = 0;
const scrollThreshold = 100;

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Add/remove scrolled class for background effect
    if (scrollTop > scrollThreshold) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Hide/show navbar on scroll (optional - uncomment if desired)
    // if (scrollTop > lastScrollTop && scrollTop > 200) {
    //     navbar.style.transform = 'translateY(-100%)';
    // } else {
    //     navbar.style.transform = 'translateY(0)';
    // }
    
    lastScrollTop = scrollTop;
});

// ===== ACTIVE NAVIGATION LINK =====
function setActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            if (navLink) navLink.classList.add('active');
        }
    });
}

window.addEventListener('scroll', setActiveNavLink);

// ===== INTERSECTION OBSERVER FOR ANIMATIONS =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
            
            // Add staggered animation for grid items
            if (entry.target.classList.contains('board-card') || 
                entry.target.classList.contains('member-card') || 
                entry.target.classList.contains('event-card')) {
                const delay = Array.from(entry.target.parentNode.children).indexOf(entry.target) * 100;
                entry.target.style.animationDelay = `${delay}ms`;
            }
        }
    });
}, observerOptions);

// ===== ENHANCED FORM HANDLING =====
const contactForm = document.querySelector('form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        // Add loading state
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;
        
        // Simulate form submission (replace with actual form handling)
        setTimeout(() => {
            // Show success message
            showNotification('Thank you for your message! We will get back to you soon.', 'success');
            
            // Reset form
            this.reset();
            
            // Reset button
            submitBtn.textContent = originalText;
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;
        }, 2000);
    });
}

// ===== NOTIFICATION SYSTEM =====
function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.innerHTML = `
    <div class="notification-content">
      <span class="notification-message">${message}</span>
      <button class="notification-close">&times;</button>
    </div>
  `;
  
  // Add styles
  const bgColor = type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6';
  notification.style.cssText = `
    position: fixed;
    top: 100px;
    right: 20px;
    background: ${bgColor};
    color: white;
    padding: 1rem 1.5rem;
    border-radius: 8px;
    box-shadow: 0 10px 25px rgba(0,0,0,0.2);
    z-index: 10000;
    transform: translateX(100%);
    transition: transform 0.3s ease;
    max-width: 400px;
    font-weight: 500;
  `;
  
  document.body.appendChild(notification);
  
  // Animate in
  setTimeout(() => {
    notification.style.transform = 'translateX(0)';
  }, 100);
  
  // Close button functionality
  const closeBtn = notification.querySelector('.notification-close');
  closeBtn.addEventListener('click', () => {
    notification.style.transform = 'translateX(100%)';
    setTimeout(() => notification.remove(), 300);
  });
  
  // Auto remove after 5 seconds
  setTimeout(() => {
    if (notification.parentNode) {
      notification.style.transform = 'translateX(100%)';
      setTimeout(() => notification.remove(), 300);
    }
  }, 5000);
}

// ===== IMAGE LAZY LOADING =====
const images = document.querySelectorAll('img[data-src]');
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            imageObserver.unobserve(img);
        }
    });
});

images.forEach(img => imageObserver.observe(img));

// ===== PARALLAX EFFECT FOR HERO SECTION =====
const heroBanner = document.querySelector('.hero-banner');
if (heroBanner) {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        heroBanner.style.transform = `translateY(${rate}px)`;
    });
}

// ===== COUNTER ANIMATION =====
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start);
        }
    }, 16);
}

// ===== SCROLL TO TOP BUTTON =====
function createScrollToTopButton() {
    const scrollBtn = document.createElement('button');
    scrollBtn.innerHTML = '↑';
    scrollBtn.className = 'scroll-to-top';
    scrollBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: linear-gradient(135deg, #1e40af, #f59e0b);
        color: white;
        border: none;
        cursor: pointer;
        font-size: 20px;
        font-weight: bold;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        transition: all 0.3s ease;
        opacity: 0;
        visibility: hidden;
        z-index: 1000;
    `;
    
    document.body.appendChild(scrollBtn);
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollBtn.style.opacity = '1';
            scrollBtn.style.visibility = 'visible';
        } else {
            scrollBtn.style.opacity = '0';
            scrollBtn.style.visibility = 'hidden';
        }
    });
    
    // Scroll to top functionality
    scrollBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Hover effects
    scrollBtn.addEventListener('mouseenter', () => {
        scrollBtn.style.transform = 'scale(1.1)';
    });
    
    scrollBtn.addEventListener('mouseleave', () => {
        scrollBtn.style.transform = 'scale(1)';
    });
}

// ===== ENHANCED CARD HOVER EFFECTS =====
function enhanceCardHoverEffects() {
    const cards = document.querySelectorAll('.board-card, .member-card, .event-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// ===== LOADING ANIMATIONS =====
function initializeAnimations() {
    // Observe elements for animation
    const animateElements = document.querySelectorAll(
        '.info-card, .board-card, .member-card, .event-card, .mv-card, .about-text, .about-image'
    );
    
    animateElements.forEach(el => observer.observe(el));
    
    // Add staggered animation to grid items
    const gridItems = document.querySelectorAll('.board-grid, .members-grid, .events-grid');
    gridItems.forEach(grid => {
        const items = grid.children;
        Array.from(items).forEach((item, index) => {
            item.style.animationDelay = `${index * 100}ms`;
        });
    });
}

// ===== PERFORMANCE OPTIMIZATION =====
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Optimize scroll events
const optimizedScrollHandler = debounce(() => {
    setActiveNavLink();
}, 10);

window.addEventListener('scroll', optimizedScrollHandler);

// ===== IMAGE POPUP FUNCTIONALITY =====
function initializeImagePopup() {
  const popup = document.getElementById('imagePopup');
  const popupImage = document.getElementById('popupImage');
  const closePopup = document.getElementById('closePopup');
  
  // Add click event to all event images
  const eventImages = document.querySelectorAll('.event-image img');
  eventImages.forEach(img => {
    img.addEventListener('click', function() {
      const imageSrc = this.src;
      const imageAlt = this.alt;
      
      popupImage.src = imageSrc;
      popupImage.alt = imageAlt;
      popup.classList.add('active');
      document.body.style.overflow = 'hidden'; // Prevent scrolling
    });
  });
  
  // Close popup when clicking close button
  closePopup.addEventListener('click', function() {
    popup.classList.remove('active');
    document.body.style.overflow = ''; // Restore scrolling
  });
  
  // Close popup when clicking outside the image
  popup.addEventListener('click', function(e) {
    if (e.target === popup) {
      popup.classList.remove('active');
      document.body.style.overflow = ''; // Restore scrolling
    }
  });
  
  // Close popup with Escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && popup.classList.contains('active')) {
      popup.classList.remove('active');
      document.body.style.overflow = ''; // Restore scrolling
    }
  });
}

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
  // Initialize all features immediately
  createScrollToTopButton();
  enhanceCardHoverEffects();
  initializeAnimations();
  
  // Add loaded class to page
  document.body.classList.add('loaded');
  
  // Initialize counter animations
  initializeCounters();
  
  // Initialize newsletter form
  initializeNewsletterForm();
  
  // Initialize contact form
  initializeContactForm();
  
  // Initialize dynamic effects
  initializeDynamicEffects();
  
  // Initialize particle effects
  initializeParticleEffects();
  
  // Initialize image popup functionality
  initializeImagePopup();
});

// ===== DYNAMIC EFFECTS =====
function initializeDynamicEffects() {
  // Keep only essential animations - removed excessive animations
}

// ===== PARTICLE EFFECTS =====
function initializeParticleEffects() {
  // Removed particle effects to reduce animations
}

// ===== ENHANCED SCROLL EFFECTS =====
function initializeScrollEffects() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in-up');
      }
    });
  }, observerOptions);

  // Observe only essential elements
  const animateElements = document.querySelectorAll(
    '.board-card, .member-card, .event-card, .stat-item'
  );
  
  animateElements.forEach(el => scrollObserver.observe(el));
}

// Initialize scroll effects
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(initializeScrollEffects, 1000);
});

// ===== COUNTER ANIMATIONS =====
function initializeCounters() {
  const statNumbers = document.querySelectorAll('.stat-number');
  
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = parseInt(entry.target.dataset.target);
        animateCounter(entry.target, target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  
  statNumbers.forEach(stat => counterObserver.observe(stat));
}

// ===== NEWSLETTER FORM =====
function initializeNewsletterForm() {
  const newsletterForm = document.querySelector('.newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const email = this.querySelector('input[type="email"]').value;
      const submitBtn = this.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      
      // Add loading state
      submitBtn.textContent = 'Subscribing...';
      submitBtn.disabled = true;
      
      // Simulate subscription
      setTimeout(() => {
        showNotification('Thank you for subscribing to our newsletter!', 'success');
        this.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      }, 2000);
    });
  }
}

// ===== CONTACT FORM =====
function initializeContactForm() {
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Validate form
      if (!validateForm(this)) {
        return;
      }
      
      const submitBtn = this.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      
      // Add loading state
      submitBtn.classList.add('loading');
      submitBtn.disabled = true;
      
      // Get form data
      const formData = new FormData(this);
      const data = Object.fromEntries(formData);
      
      // Simulate form submission (replace with actual backend integration)
      setTimeout(() => {
        // Store form data (you can send this to your backend)
        storeFormData(data);
        
        // Show success modal
        showSuccessModal();
        
        // Reset form
        this.reset();
        
        // Reset button
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
      }, 2000);
    });
    
    // Real-time validation
    addRealTimeValidation(contactForm);
  }
}

// Form validation
function validateForm(form) {
  let isValid = true;
  const requiredFields = form.querySelectorAll('[required]');
  
  requiredFields.forEach(field => {
    if (!field.value.trim()) {
      showFieldError(field, 'This field is required');
      isValid = false;
    } else {
      clearFieldError(field);
    }
  });
  
  // Email validation
  const emailField = form.querySelector('#email');
  if (emailField.value && !isValidEmail(emailField.value)) {
    showFieldError(emailField, 'Please enter a valid email address');
    isValid = false;
  }
  
  // Phone validation (if provided)
  const phoneField = form.querySelector('#phone');
  if (phoneField.value && !isValidPhone(phoneField.value)) {
    showFieldError(phoneField, 'Please enter a valid phone number');
    isValid = false;
  }
  
  return isValid;
}

// Real-time validation
function addRealTimeValidation(form) {
  const fields = form.querySelectorAll('input, textarea, select');
  
  fields.forEach(field => {
    field.addEventListener('blur', () => {
      validateField(field);
    });
    
    field.addEventListener('input', () => {
      if (field.classList.contains('error')) {
        validateField(field);
      }
    });
  });
}

// Validate individual field
function validateField(field) {
  const value = field.value.trim();
  
  if (field.hasAttribute('required') && !value) {
    showFieldError(field, 'This field is required');
    return false;
  }
  
  if (field.type === 'email' && value && !isValidEmail(value)) {
    showFieldError(field, 'Please enter a valid email address');
    return false;
  }
  
  if (field.type === 'tel' && value && !isValidPhone(value)) {
    showFieldError(field, 'Please enter a valid phone number');
    return false;
  }
  
  clearFieldError(field);
  return true;
}

// Show field error
function showFieldError(field, message) {
  clearFieldError(field);
  
  field.classList.add('error');
  field.style.borderColor = '#ef4444';
  
  const validationDiv = field.parentNode.querySelector('.form-validation');
  if (validationDiv) {
    validationDiv.textContent = message;
  }
}

// Clear field error
function clearFieldError(field) {
  field.classList.remove('error');
  field.style.borderColor = '';
  
  const validationDiv = field.parentNode.querySelector('.form-validation');
  if (validationDiv) {
    validationDiv.textContent = '';
  }
}

// Email validation
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Phone validation
function isValidPhone(phone) {
  const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
  return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''));
}

// Store form data (replace with actual backend integration)
function storeFormData(data) {
  // You can send this data to your backend server
  console.log('Form data collected:', data);
  
  // For now, store in localStorage as example
  const submissions = JSON.parse(localStorage.getItem('contactSubmissions') || '[]');
  submissions.push({
    ...data,
    timestamp: new Date().toISOString()
  });
  localStorage.setItem('contactSubmissions', JSON.stringify(submissions));
}

// Show success modal
function showSuccessModal() {
  const modal = document.getElementById('successModal');
  if (modal) {
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
  }
}

// Close modal
function closeModal() {
  const modal = document.getElementById('successModal');
  if (modal) {
    modal.style.display = 'none';
    document.body.style.overflow = '';
  }
}

// Send another message
function sendAnotherMessage() {
  closeModal();
  // Scroll to form
  const form = document.getElementById('contactForm');
  if (form) {
    form.scrollIntoView({ behavior: 'smooth' });
  }
}

// Close modal when clicking outside
window.addEventListener('click', function(e) {
  const modal = document.getElementById('successModal');
  if (e.target === modal) {
    closeModal();
  }
});

// Close modal with Escape key
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    closeModal();
  }
});

// ===== ACCESSIBILITY IMPROVEMENTS =====
// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // Close mobile menu
        if (navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
});

// Add focus management for mobile menu
if (hamburger) {
    hamburger.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            hamburger.click();
        }
    });
}

// ===== ERROR HANDLING =====
window.addEventListener('error', (e) => {
    console.error('JavaScript error:', e.error);
    // You can add error reporting here
});

// ===== SERVICE WORKER REGISTRATION (for PWA features) =====
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// ===== PAST PRESIDENTS MODAL FUNCTIONALITY =====

// Past Presidents data
const pastPresidents = {
  1: {
    name: "Itr. Suyog Adhikari",
    year: "2022-2023",
    image: "photos/logo1.png",
    message: "It was an honor to serve as President of the Interact Club of Pokhara Lakeside. During my tenure, we focused on community service, youth development, and international understanding. We successfully organized numerous events that brought positive change to our community. The dedication and passion of our members made every project a success. I'm proud of what we accomplished together and confident that the club will continue to grow and serve with excellence."
  },
  2: {
    name: "Itr. Sampada Lamsal",
    year: "2021-2022",
    image: "photos/logo1.png",
    message: "Leading this incredible club was one of the most rewarding experiences of my life. We navigated through challenging times with resilience and creativity, adapting our programs to serve the community safely. Our focus on digital literacy and mental health awareness programs helped many during difficult periods. The spirit of service and leadership I witnessed in our members continues to inspire me. The Interact Club truly embodies the Rotary spirit of 'Service Above Self.'"
  },
  3: {
    name: "Itr. Mridul Jung Pandey",
    year: "2020-2021",
    image: "photos/logo1.png",
    message: "My presidency coincided with unprecedented global challenges, but our club rose to the occasion with remarkable adaptability and compassion. We transformed our approach to community service, embracing technology while maintaining the human connection that makes our club special. The projects we implemented, from online education support to community health initiatives, demonstrated our commitment to serving others. I'm grateful for the opportunity to lead such an amazing team."
  },
  4: {
    name: "Itr. Divya Parajuli",
    year: "2019-2020",
    image: "photos/logo1.png",
    message: "Serving as President of the Interact Club was a transformative experience that taught me the true meaning of leadership and community service. We focused on environmental conservation, youth empowerment, and cultural exchange programs. The dedication of our members and the support from our community made every initiative successful. I learned that leadership is not about being in charge, but about taking care of those in your charge. The club's legacy continues to inspire positive change."
  },
  5: {
    name: "Itr. Amir Chaudhary",
    year: "2018-2019",
    image: "photos/logo1.png",
    message: "My time as President was marked by innovation and growth. We introduced new programs focused on skill development, entrepreneurship, and international collaboration. The club expanded its reach and impact, touching more lives than ever before. I'm proud of how we built bridges between different communities and cultures. The Interact Club's commitment to excellence and service continues to be a beacon of hope and inspiration for young leaders."
  }
};

// Open president modal
function openPresidentModal(presidentId) {
  const modal = document.getElementById('presidentModal');
  const president = pastPresidents[presidentId];
  
  if (modal && president) {
    // Update modal content
    document.getElementById('modalPresidentImage').src = president.image;
    document.getElementById('modalPresidentName').textContent = president.name;
    document.getElementById('modalPresidentYear').textContent = president.year;
    document.getElementById('modalPresidentMessage').innerHTML = president.message;
    
    // Show modal with animation
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    // Trigger animation
    setTimeout(() => {
      modal.classList.add('show');
    }, 10);
  }
}

// Close president modal
function closePresidentModal() {
  const modal = document.getElementById('presidentModal');
  
  if (modal) {
    // Hide modal with animation
    modal.classList.remove('show');
    
    // Wait for animation to complete then hide
    setTimeout(() => {
      modal.style.display = 'none';
      document.body.style.overflow = '';
    }, 250);
  }
}

// Close modal when clicking outside
document.addEventListener('click', function(e) {
  const modal = document.getElementById('presidentModal');
  if (e.target === modal) {
    closePresidentModal();
  }
});

// Close modal with Escape key
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    const modal = document.getElementById('presidentModal');
    if (modal && modal.style.display === 'block') {
      closePresidentModal();
    }
  }
});

// Add click event listeners to all view message buttons
document.addEventListener('DOMContentLoaded', function() {
  const viewButtons = document.querySelectorAll('.view-message-btn');
  viewButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      const presidentCard = this.closest('.past-president-card');
      const presidentId = presidentCard.getAttribute('data-president');
      openPresidentModal(parseInt(presidentId));
    });
  });
});

// Add hover effects for president cards
document.addEventListener('DOMContentLoaded', function() {
  const presidentCards = document.querySelectorAll('.past-president-card');
  
  presidentCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-8px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0) scale(1)';
    });
  });
});


