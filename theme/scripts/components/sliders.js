/*----------------------------
Scripts
----------------------------*/

// Helpers

import initCustomNavFlickity from '../helpers/initCustomNavFlickity';

/*----------------------------
Base Slider
----------------------------*/

function initBaseSlider() {
  const baseSliderContainers = document.querySelectorAll(
    '.base-slider__container',
  );

  if (baseSliderContainers.length > 0) {
    [...baseSliderContainers].forEach(baseSliderContainer => {
      // Settings
      const autoPlay = baseSliderContainer.dataset.autoplay
        ? baseSliderContainer.dataset.autoplay
        : false;
      const fade = baseSliderContainer.dataset.fade
        ? baseSliderContainer.dataset.fade
        : false;

      // Initialize the slider
      const baseSliderFlickity = initCustomNavFlickity(baseSliderContainer, {
        autoPlay,
        prevNextButtons: false,
        pageDots: false,
        fade,
        imagesLoaded: true,
        adaptiveHeight: false,
        cellAlign: 'left',
      });
    });
  }
}

/*-------------------------------
Init
-------------------------------*/

document.addEventListener('DOMContentLoaded', event => {
  initBaseSlider();
});
