document.addEventListener('DOMContentLoaded', function() {
  // Mobile Menu Elements
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const mobileMenu = document.querySelector('.mobile-menu');
  const mobileMenuClose = document.querySelector('.mobile-menu-close');

  // Check if elements exist
  if (!mobileMenuBtn || !mobileMenu || !mobileMenuClose) {
    console.error('Mobile menu elements missing!');
    return;
  }

  // Toggle Menu Function
  function toggleMenu() {
    mobileMenu.classList.toggle('show');
    document.body.style.overflow = mobileMenu.classList.contains('show') ? 'hidden' : '';
  }

  // Event Listeners
  mobileMenuBtn.addEventListener('click', toggleMenu);
  mobileMenuClose.addEventListener('click', toggleMenu);

  // Close menu when clicking on links
  document.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', toggleMenu);
  });

  // Close menu when clicking outside
  document.addEventListener('click', function(event) {
    if (mobileMenu.classList.contains('show') && 
        !event.target.closest('.mobile-menu') && 
        !event.target.closest('.mobile-menu-btn')) {
      toggleMenu();
    }
  });
});
