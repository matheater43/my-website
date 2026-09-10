/* ==========================================================================
   GLOBAL COMPONENT LOADER & INTERACTION LOGIC
   ========================================================================== */

function loadComponent(elementId, fileUrl, callback) {
  fetch(fileUrl)
    .then(r => {
      if (!r.ok) throw new Error('Failed to load ' + fileUrl);
      return r.text();
    })
    .then(d => {
      const target = document.getElementById(elementId);
      if (target) {
        target.innerHTML = d;
        if (callback) callback();
      }
    })
    .catch(e => console.error(e));
}

function initializeNavbarToggle() {
  const toggleInput = document.getElementById('nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (toggleInput && navLinks) {
    toggleInput.addEventListener('change', function() {
      if (this.checked) {
        navLinks.classList.add('is-active');
      } else {
        navLinks.classList.remove('is-active');
      }
    });
  }
}

/* ==========================================================================
   BACK TO TOP BUTTON LOGIC
   ========================================================================== */
function initializeBackToTop() {
  const backToTopBtn = document.getElementById('back-to-top');

  if (!backToTopBtn) return;

  // Show/hide button based on scroll position
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      backToTopBtn.classList.add('is-visible');
    } else {
      backToTopBtn.classList.remove('is-visible');
    }
  });

  // Auto scroll to top on click
  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'auto'
    });
  });
}

// Call the initializer inside DOMContentLoaded
window.addEventListener('DOMContentLoaded', () => {
  loadComponent('global-navbar', 'components/navbar.html', initializeNavbarToggle);
  loadComponent('global-footer', 'components/footer.html');
  
  // Initialize Back to Top functionality
  initializeBackToTop();
});
