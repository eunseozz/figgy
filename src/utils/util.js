export const getAssetUrl = (path) =>
  typeof chrome !== "undefined" && chrome.runtime?.getURL
    ? chrome.runtime.getURL(path)
    : `/${path}`;
