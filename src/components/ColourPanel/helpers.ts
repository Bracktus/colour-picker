export const getHexString = (r: number, g: number, b: number) => {
  const decToHex = (num: number) => {
    const x = Math.round(num).toString(16);
    return x.length > 1 ? x : `0${x}`;
  };
  const hexCode = [r, g, b].map(decToHex).join("");
  return `#${hexCode}`;
};

export const formatColour = (prefix: string, values: number[]) => {
  const rounded = values.map((v) => v.toFixed(3));
  return `${prefix}(${rounded[0]}, ${rounded[1]}, ${rounded[2]})`;
};

export const HSVtoRGB = (hue: number, sat: number, val: number) => {
  // hue - [0, 360]
  // sat - [0, 1]
  // val - [0, 1]
  const chroma = val * sat;
  const hueNorm = hue / 60;
  const x = chroma * (1 - Math.abs((hueNorm % 2) - 1));
  const m = val - chroma;
  let r = -1,
    g = -1,
    b = -1;

  if (hueNorm < 1) {
    [r, g, b] = [chroma, x, 0];
  } else if (hueNorm < 2) {
    [r, g, b] = [x, chroma, 0];
  } else if (hueNorm < 3) {
    [r, g, b] = [0, chroma, x];
  } else if (hueNorm < 4) {
    [r, g, b] = [0, x, chroma];
  } else if (hueNorm < 5) {
    [r, g, b] = [x, 0, chroma];
  } else if (hueNorm <= 6) {
    [r, g, b] = [chroma, 0, x];
  }
  return [r + m, g + m, b + m].map((v) => v * 255);
};

export const RGBtoHSV = (r: number, g: number, b: number) => {
  const xMax = Math.max(r, g, b);
  const xMin = Math.min(r, g, b);
  const chroma = xMax - xMin;
  const lig = (xMax + xMin) / 2;
  let hue = 0;
  if (chroma === 0) {
    hue = 0;
  } else if (xMax === r) {
    hue = 60 * (0 + (g - b) / chroma);
  } else if (xMax === g) {
    hue = 60 * (2 + (b - r) / chroma);
  } else if (xMax === b) {
    hue = 60 * (4 + (r - g) / chroma);
  }
  hue = ((hue % 360) + 360) % 360;
  const sat = lig === 0 ? 0 : chroma / xMax;
  return [hue, sat * 100, lig * 100];
};
