import { horizontalSplit } from "./horizontalSplit";
import { plainBox } from "./plainBox";
import { verticalSplit } from "./verticalSplit";
import { circleInside } from "./circleInside";
import { strips } from "./strips";
import { midSquare } from "./midSquare";
import { unevenSplit } from "./unevenSplit";
import { border } from "./border";
import { shadow } from "./shadow";

export interface Sketch {
  name: string;
  func: (canvas: CanvasRenderingContext2D, cols: number[][]) => void;
}

export interface Sketches {
  [key: string]: Sketch[];
}

export const sketches: Sketches = {
  1: [
    {
      name: "Default",
      func: plainBox,
    },
  ],
  2: [
    {
      name: "Horizontal split",
      func: horizontalSplit,
    },
    {
      name: "Vertical split",
      func: verticalSplit,
    },
    {
      name: "Circle",
      func: circleInside,
    },
  ],
  3: [
    {
      name: "Middle square",
      func: midSquare,
    },
    {
      name: "Uneven split",
      func: unevenSplit,
    },
    {
      name: "Bordered circle",
      func: border,
    },
    {
      name: "Shadowed circle",
      func: shadow,
    },
  ],
  any: [
    {
      name: "Strips",
      func: strips,
    },
  ],
};

export default sketches;
