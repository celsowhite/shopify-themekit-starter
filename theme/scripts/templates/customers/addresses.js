/*----------------------------
Customer Addresses
---
Mainly creates functionality to show the appropriate country/province selectors.
----------------------------*/

import { AddressForm } from '@shopify/theme-addresses';

document.addEventListener('DOMContentLoaded', event => {
  // Save the selectors
  const selectors = {
    addressContainer: '[data-address]',
    addressFields: '[data-address-fields]',
    addressToggle: '[data-address-toggle]',
    addressForm: '[data-address-form]',
    addressDeleteForm: '[data-address-delete-form]',
  };
  const hideClass = 'hide';

  // Initialize Form - Helper
  function initializeAddressForm(container) {
    const addressFields = container.querySelector(selectors.addressFields);
    const addressForm = container.querySelector(selectors.addressForm);
    const deleteForm = container.querySelector(selectors.addressDeleteForm);

    container.querySelectorAll(selectors.addressToggle).forEach(button => {
      button.addEventListener('click', e => {
        e.preventDefault();
        addressForm.classList.toggle(hideClass);
      });
    });

    // Initialize - Auto populate country/province.

    AddressForm(addressFields, 'en');

    // Delete Form

    if (deleteForm) {
      deleteForm.addEventListener('submit', event => {
        const confirmMessage = deleteForm.getAttribute('data-confirm-message');

        if (
          !window.confirm(
            confirmMessage || 'Are you sure you wish to delete this address?',
          )
        ) {
          event.preventDefault();
        }
      });
    }
  }

  /*----------------------------
Initialize Address Forms
----------------------------*/

  const addressForms = document.querySelectorAll(selectors.addressContainer);

  if (addressForms.length) {
    addressForms.forEach(addressContainer => {
      initializeAddressForm(addressContainer);
    });
  }
});
