/*----------------------------
URL Select
---
Refresh a page using a url value from a select dropdown.
----------------------------*/

document.addEventListener('DOMContentLoaded', event => {
	const urlSelects = document.querySelectorAll('.url-select');

	Array.from(urlSelects).forEach(select => {
		select.addEventListener('change', () => {
			// URL
			const url = select.value;

			// Reload the page.
			window.top.location.href = url;
		});
	});
});
