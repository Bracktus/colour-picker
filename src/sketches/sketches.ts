import { horizontalSplit } from "./horizontalSplit";
import { plainBox } from "./plainBox";
import { verticalSplit } from "./verticalSplit";

export interface Sketch {
  name: string;
  func: (a: CanvasRenderingContext2D, b: number[][]) => void;
}

export interface Sketches {
  [key: number]: Sketch[];
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
      name: "Horizontal Split",
      func: horizontalSplit,
    },
    {
      name: "Vertical Split",
      func: verticalSplit,
    },
  ],
};
export default sketches;