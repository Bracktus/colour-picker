// CSS Colour properties expect hsl not hsv :<
const HSVtoHSL = (col: number[]) => {
  // h [0 - 360]
  // s [0 - 100]
  // v [0 - 100]

  let [h, s, v] = col;
  s = s / 100;
  v = v / 100;
  const newL = v * (1 - s / 2);
  const newS =
    newL >= 1 || newL <= 0 ? 0 : (v - newL) / Math.min(newL, 1 - newL);
  return [h, newS * 100, newL * 100];
};

export const formatCol = (col: number[]) => {
  const [h, s, l] = HSVtoHSL(col);
  return `hsl(${h}, ${s}%, ${l}%)`;
};
