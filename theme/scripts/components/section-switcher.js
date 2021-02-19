/*----------------------------
Easily show/hide sections of a page by clicking links.
Specifically used on login and forgot password pages to dynamically show forms.
----------------------------*/

/*----------------------------
Section Switcher
----------------------------*/

document.addEventListener("DOMContentLoaded", event => {
  /*--- Save the different section switcher links and switchable sections on the page ---*/

  const sectionSwitchers = document.querySelectorAll(".section-switcher");

  const switchableSections = document.querySelectorAll(".switchable-section");

  /*--- Show Section ---*/

  function showSection(sectionHash) {
    // Hide all switchable sections on the page

    Array.from(switchableSections).forEach(section => {
      section.style.display = "none";
    });

    // Show the new section

    const sectionToShow = document.querySelector(sectionHash);
    sectionToShow.style.display = "block";
  }

  /*--- Section link click events ---*/

  Array.from(sectionSwitchers).forEach(sectionSwitcher => {
    // On click show the respective section.

    sectionSwitcher.addEventListener("click", e => {
      // Prevent default
      e.preventDefault();

      // Show Section
      showSection(`#${sectionSwitcher.dataset.sectionToShow}`);
    });
  });

  /*--- Hash Section Changer ---*/

  function checkHash() {
    const hash = window.location.hash;

    // If a hash exists in the url and there is a switchable section on the page with that hash then show that section.
    if (hash && document.querySelector(`${hash}.switchable-section`)) {
      showSection(hash);
    }
  }

  checkHash();
});
