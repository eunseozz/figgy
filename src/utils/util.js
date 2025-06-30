export const getAssetUrl = (path) =>
  typeof chrome !== "undefined" && chrome.runtime?.getURL
    ? chrome.runtime.getURL(path)
    : `/${path}`;

export const getFileKeyFromUrl = (url) => {
  // eslint-disable-next-line no-useless-escape
  const match = url.match(/figma\.com\/(?:file|design)\/([^\/?#]+)/);

  return match?.[1] || null;
};
