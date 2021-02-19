/*-------------------------------
Imports
-------------------------------*/

import {
  getThemeLocalStorage,
  setThemeLocalStorage
} from "../helpers/theme-local-storage";

document.addEventListener("DOMContentLoaded", () => {
  /*----------------------------
  Show dismissible notifications on page load
  All dismissible notifications are hidden by default using css.
  ----------------------------*/

  function showDismissibleNotifications() {
    // Capture all of the dismissible notifications on the page

    const dismissibleNotifications = document.querySelectorAll(
      ".notification--is-dismissible"
    );

    // Save our local storage array which indicates which banners have already been hidden

    let themeLocalStorage = getThemeLocalStorage("hiddenNotifications");

    Array.from(dismissibleNotifications).forEach(notification => {
      // Check if the notification is in our hidden array in local storage. If not, then show it.

      const notificationName = notification.id;

      if (!themeLocalStorage.hiddenNotifications.includes(notificationName)) {
        notification.style.display = "block";
      }
    });
  }

  showDismissibleNotifications();

  /*----------------------------
  Dismiss Notifications
  ----------------------------*/

  // Capture all of the dismiss buttons on the page and loop through them.

  const dismissButtons = document.querySelectorAll(
    ".notification__dismiss-btn"
  );

  Array.from(dismissButtons).forEach(button => {
    // Save the notification that is associated with this button.
    const notificationName = button.dataset.dismiss;
    const notificationElement = document.querySelector("#" + notificationName);

    // Click action on this button

    button.addEventListener("click", e => {
      e.preventDefault();

      // Hide the notification from the page.
      notificationElement.style.display = "none";

      // Indicate in local storage that this notification has been hidden.
      // Get the current array of hidden notifications from local storage.
      let themeLocalStorage = getThemeLocalStorage("hiddenNotifications");

      themeLocalStorage.hiddenNotifications.push(notificationName);

      // Set local storage with the new array info.
      setThemeLocalStorage(themeLocalStorage);
    });
  });
});
