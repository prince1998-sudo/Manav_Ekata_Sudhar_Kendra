// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenuClose = document.getElementById('mobileMenuClose');
const mobileMenu = document.getElementById('mobileMenu');

mobileMenuBtn.addEventListener('click', () => {
  mobileMenu.classList.add('show');
  document.body.style.overflow = 'hidden';
});

mobileMenuClose.addEventListener('click', () => {
  mobileMenu.classList.remove('show');
  document.body.style.overflow = '';
});

// Close menu when clicking on links (added improvement)
const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
mobileNavLinks.forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('show');
    document.body.style.overflow = '';
  });
});

// Install Prompt
let deferredPrompt;
const installPrompt = document.getElementById('installPrompt');
const installBtn = document.getElementById('installBtn');
const cancelInstall = document.getElementById('cancelInstall');
const installClose = document.getElementById('installClose');

// Show install prompt when PWA is available
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  
  // Show prompt after 5 seconds
  setTimeout(() => {
    if (deferredPrompt) { // Check if prompt still exists
      installPrompt.classList.add('show');
    }
  }, 5000);
});

// Install button click handler
installBtn.addEventListener('click', async () => {
  if (deferredPrompt) {
    try {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      console.log(`User ${outcome} the install prompt`);
      if (outcome === 'accepted') {
        // Track installation success if needed
      }
    } catch (err) {
      console.error('Installation failed:', err);
    } finally {
      deferredPrompt = null;
      installPrompt.classList.remove('show');
    }
  }
});

// Close prompt handlers
const closeInstallPrompt = () => {
  installPrompt.classList.remove('show');
  // Optionally set a cookie/localStorage to not show again
};

cancelInstall.addEventListener('click', closeInstallPrompt);
installClose.addEventListener('click', closeInstallPrompt);

// Service Worker Registration for PWA
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => {
        console.log('ServiceWorker registration successful with scope:', registration.scope);
      })
      .catch(err => {
        console.error('ServiceWorker registration failed:', err);
      });
  });
}

// Animation on scroll with Intersection Observer (improved performance)
const animateElements = document.querySelectorAll('.animate');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target); // Stop observing after animation
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
});

animateElements.forEach(element => {
  observer.observe(element);
});

// Initialize animations on load
window.addEventListener('DOMContentLoaded', () => {
  animateElements.forEach(el => {
    if (el.getBoundingClientRect().top < window.innerHeight * 0.8) {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }
  });
});
