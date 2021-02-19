/*----------------------------
Scripts
----------------------------*/

document.addEventListener('DOMContentLoaded', event => {
  // Elements

  const body = document.querySelector('body');
  const mobileNavOverlay = document.querySelector('.mobile-nav-overlay');
  const menuIcons = document.querySelectorAll('.menu-icon');

  [...menuIcons].forEach(icon => {
    icon.addEventListener('click', function(e) {
      e.preventDefault();
      this.classList.toggle('active');
      mobileNavOverlay.classList.toggle('open');
      body.classList.toggle('no-scroll');
      body.classList.toggle('mobile-nav-is-open');
    });
  });
});
