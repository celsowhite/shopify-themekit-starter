/*-------------------------------
Style
-------------------------------*/

import '../../styles/components/single-toggle.scss';

/*-------------------------------
Single Toggle
-------------------------------*/

document.addEventListener('DOMContentLoaded', event => {
  // Get the clickable toggle headers.
  const singleToggleHeaders = document.querySelectorAll(
    '.single-toggle__header',
  );

  // Once a toggle header is clicked then apply the open class to the container.
  // Animations within the container are triggered using css.
  [...singleToggleHeaders].forEach(toggleHeader => {
    toggleHeader.addEventListener('click', function() {
      const toggleContainer = this.closest('.single-toggle');
      toggleContainer.classList.toggle('open');
    });
  });
});
