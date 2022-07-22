function getLocalStorage(key, initial) {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return initial;
  }
}

export default getLocalStorage;
