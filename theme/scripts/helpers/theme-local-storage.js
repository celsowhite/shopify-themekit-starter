const themeStorageName = "_theme";

/**
 * Get Theme Local Storage
 *
 * @param   string    key                -  The specific key we'd like to include in the returned local storage.
 *
 * @return  object    themeLocalStorage  -  Local storage data including the key we requested regardless of if that key was already set.
 */

export function getThemeLocalStorage(key) {
  let themeLocalStorage =
    JSON.parse(localStorage.getItem(themeStorageName)) || {};

  themeLocalStorage[key] = themeLocalStorage[key] || [];

  return themeLocalStorage;
}

/**
 * Set Theme Local Storage
 *
 * @param   object    themeLocalStorage  -  Local storage data we want to push back to the themes local storage.
 *
 */

export function setThemeLocalStorage(themeLocalStorage) {
  localStorage.setItem(themeStorageName, JSON.stringify(themeLocalStorage));
}
