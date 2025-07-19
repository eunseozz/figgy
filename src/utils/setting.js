export const hexToRgba = (hex, alpha = 0.5) => {
  const parsedHex = hex.replace("#", "");
  const bigint = parseInt(parsedHex, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;

  const isWhite = r === 255 && g === 255 && b === 255;

  return `rgba(${r}, ${g}, ${b}, ${isWhite ? 0 : alpha})`;
};
