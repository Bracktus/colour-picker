import { horizontalSplit } from "./horizontalSplit";
import { plainBox } from "./plainBox";
import { verticalSplit } from "./verticalSplit";
import { circleInside } from "./circleInside";
import { strips } from "./strips";
import { midSquare } from "./midSquare";
import { invertedMidSquare } from "./invertedMidSquare";

export interface Sketch {
  name: string;
  func: (a: CanvasRenderingContext2D, b: number[][]) => void;
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
      func: circleInside
    }
  ],
  3: [
    {
      name: "Middle square",
      func: midSquare
    },
    {
      name: "Inverted middle square",
      func: invertedMidSquare
    }
  ],
  any: [
    {
      name: "Strips",
      func: strips
    }
  ]
};
export default sketches;

