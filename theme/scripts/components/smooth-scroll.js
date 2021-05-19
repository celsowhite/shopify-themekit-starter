import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

/*-------------------------
Smooth Scroll
-------------------------*/

function initSmoothScroll() {
  gsap.registerPlugin(ScrollToPlugin);
  const mainHeader = document.querySelector('.main-header');
  const mainHeaderHeight = mainHeader.offsetHeight;
  const anchorLinks = document.querySelectorAll('a[href*="#"]');

  [...anchorLinks].forEach(link => {
    const linkHash = `#${link.href.split('#')[1]}`;
    link.addEventListener('click', e => {
      e.preventDefault();

      gsap.to(window, {
        duration: 1,
        scrollTo: {
          y: `${linkHash}`,
          offsetY: mainHeaderHeight,
        },
      });
    });
  });
}

/*-------------------------------
Init
-------------------------------*/

document.addEventListener('DOMContentLoaded', event => {
  initSmoothScroll();
});
