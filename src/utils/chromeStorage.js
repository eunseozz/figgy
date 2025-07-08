export const chromeStorage = {
  getItem: (name) =>
    new Promise((resolve) => {
      chrome.storage.local.get([name], (result) => {
        resolve(result[name] ?? null);
      });
    }),
  setItem: (name, value) =>
    new Promise((resolve) => {
      chrome.storage.local.set({ [name]: value }, () => {
        resolve();
      });
    }),
  removeItem: (name) =>
    new Promise((resolve) => {
      chrome.storage.local.remove([name], () => {
        resolve();
      });
    }),
};
