const localStorage = (_) => (next) => (action) => {
  const resume = next(action);

  const { meta } = action;

  if (meta && meta.localStorage) {
    const { key, value } = meta.localStorage;
    window.localStorage.setItem(key, JSON.stringify(value));
  }

  return resume;
};

export default localStorage;
