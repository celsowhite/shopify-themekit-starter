import SmoothScroll from 'smooth-scroll';

/*-------------------------
Smooth Scroll
-------------------------*/

document.addEventListener('DOMContentLoaded', event => {
  const scroll = new SmoothScroll('a[href*="#"]', {
    speed: 800,
    header: '.main-header',
    updateURL: false,
  });
});
