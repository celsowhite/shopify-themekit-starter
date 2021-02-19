import { subscribe } from 'klaviyo-subscribe';

/*-------------------------------
Klaviyo Email Signup
-------------------------------*/

document.addEventListener('DOMContentLoaded', event => {
  // Get all of the forms on the page.
  const emailSignupForms = document.querySelectorAll('.email-signup');

  // Add submit listeners to each.
  [...emailSignupForms].forEach(form => {
    form.addEventListener('submit', async e => {
      e.preventDefault();
      // Elements
      const response = form.querySelector('.email-signup__response');

      // Form Details
      const email = form.querySelector('input[name="email"]').value;
      const listId = form.querySelector('input[name="g"]').value;

      // Subscribe
      await subscribe(listId, email);

      // Show Response
      response.style.display = 'block';
      response.innerText = 'Thank you for subscribing!';

      // Hide Response
      window.setTimeout(() => {
        response.style.display = 'none';
      }, 3000);
    });
  });
});
