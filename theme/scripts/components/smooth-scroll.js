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
    // Save the link components
    const linkUrl = `${link.href.split('#')[0]}`;
    const linkHash = `#${link.href.split('#')[1]}`;

    // If this link is an internal link for the current page then activate the smooth scroll.
    if (window.location.href.includes(linkUrl) && linkHash !== '#') {
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
    }
  });
}

/*-------------------------------
Init
-------------------------------*/

document.addEventListener('DOMContentLoaded', event => {
  initSmoothScroll();
});
