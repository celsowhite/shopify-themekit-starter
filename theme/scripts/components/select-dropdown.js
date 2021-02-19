/*-------------------------------
Select Dropdown
---
Add functionality to open/close the custom styled select dropdowns.
Using event delegation because sometimes these click events are also happening
in tandem of vue js events (pdp). Allows waiting to render the select dropdown and 
still attaching listeners to its elements.
-------------------------------*/

document.addEventListener('DOMContentLoaded', event => {
  const body = document.querySelector('body');

  body.addEventListener('click', function(e) {
    const selectDropdownHeader = e.target.closest('.select-dropdown__header');
    const selectDropdownItem = e.target.closest('.select-dropdown__list-item');

    // Header Click

    if (selectDropdownHeader) {
      const selectDropdown = selectDropdownHeader.closest('.select-dropdown');
      selectDropdown.classList.toggle('select-dropdown--is-open');
    }

    // List Item Click

    if (selectDropdownItem) {
      const selectDropdown = selectDropdownItem.closest('.select-dropdown');
      selectDropdown.classList.toggle('select-dropdown--is-open');
    }
  });
});
