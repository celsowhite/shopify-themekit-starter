import Flickity from 'flickity-fade';
require('flickity-imagesloaded');

/**
 * Init Flickity
 *
 * @param   node      container       - The container element node. Flickity gallery and arrows should be within this container.
 * @param   object    flickityOptions - The specific flickity api options for this initialization.
 *
 * output   Sets up a Flickity slider instance with standard slider customizations done via the api.
 */

export default function initCustomNavFlickity(
  container,
  flickityOptions = null,
) {
  // Target the flickity slider instance and init.

  const flickityGallery = container.querySelector('.flickity');
  const flickity = new Flickity(flickityGallery, flickityOptions);

  /*--------------------
	Classes
	--------------------*/
  if (flickity.slides.length === 1) {
    container.classList.add('is-single-slide');
  }

  /*--------------------
	Arrow Nav
	--------------------*/

  const flickityArrows = container.querySelectorAll('.flickity__arrow');

  if (flickityArrows.length > 0) {
    [...flickityArrows].forEach(function(arrow) {
      arrow.addEventListener('click', e => {
        e.preventDefault();
        flickity.stopPlayer();
        if (arrow.classList.contains('flickity__arrow--prev')) {
          flickity.previous();
        } else if (arrow.classList.contains('flickity__arrow--next')) {
          flickity.next();
        }
      });
    });
  }

  /*--------------------
	Dot Nav
	--------------------*/

  // Save the dot nav items (can be thumbnails, text, etc)

  const dotNavItems = container.querySelectorAll('.flickity-dot-nav__item');
  const dotNavs = container.querySelectorAll('.flickity-dot-nav');

  if (dotNavs.length > 0) {
    [...dotNavs].forEach(nav => {
      const navItems = nav.querySelectorAll('.flickity-dot-nav__item');

      if (navItems.length > 0) {
        // Add the active class to the first dot.
        navItems[0].classList.add('active');

        // Event listener on dot click.

        [...navItems].forEach((dot, index) => {
          // Go to the slide
          dot.addEventListener('click', () => {
            flickity.select(index);

            // Pause the slider
            flickity.stopPlayer();
          });
        });
      }
    });
  }

  /*--------------------
	Count
	--------------------*/

  const flickityNavCount = container.querySelector('.flickity-nav-count');

  /*--------------------
	On Select
	--------------------*/

  flickity.on('select', function(index) {
    // Dot Nav
    if (dotNavs.length > 0) {
      [...dotNavs].forEach(nav => {
        const navItems = nav.querySelectorAll('.flickity-dot-nav__item');

        if (navItems.length > 0) {
          // Remove active class from dots
          [...navItems].forEach(dot => {
            dot.classList.remove('active');
          });
          // Add active class to selected dot
          const selectedDot = navItems[index];
          selectedDot.classList.add('active');
        }
      });
    }

    // Count
    if (flickityNavCount) {
      const currentSlide = flickity.selectedIndex + 1;
      const totalCount = flickity.slides.length;
      flickityNavCount.innerText = `${currentSlide} / ${totalCount}`;
    }
  });

  return flickity;
}
