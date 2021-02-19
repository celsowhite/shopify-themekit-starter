/*----------------------------
Scripts
----------------------------*/

// Components

import '../../components/section-switcher';

document.addEventListener('DOMContentLoaded', event => {
  /*----------------------------
  Show Reset Password Success Message
  ----------------------------*/

  const formState = document.querySelector('.reset-password-success');

  const resetSuccessMessage = document.querySelector('#reset-success-message');

  // Check if our span element for successfully password reset exists on the page. If so then it was successfully submitted.
  // Show the success message that exists outside of the password reset form.

  if (formState) {
    resetSuccessMessage.style.display = 'block';
  }
});
