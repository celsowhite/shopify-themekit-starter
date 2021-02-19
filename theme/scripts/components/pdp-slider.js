/*----------------------------
Scripts
----------------------------*/

// Helpers

import initCustomNavFlickity from '../helpers/initCustomNavFlickity';

// Components

// PDP Slider

document.addEventListener('DOMContentLoaded', event => {
	const pdpSliderContainer = document.querySelector('.pdp-slider__container');
	if (pdpSliderContainer) {
		// Initialize the slider
		const pdpSliderFlickity = initCustomNavFlickity(pdpSliderContainer, {
			autoPlay: false,
			prevNextButtons: false,
			pageDots: false,
			fade: true,
			imagesLoaded: true,
			adaptiveHeight: true,
		});
	}
});
