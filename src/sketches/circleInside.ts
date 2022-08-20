import { formatCol } from "./helpers";

export const circleInside = (
  context: CanvasRenderingContext2D,
  colours: number[][]
) => {
  const width = context.canvas.width;
  const height = context.canvas.height;

  const rad = Math.min(width, height) / 4;

  const [col1, col2] = colours;
  context.fillStyle = formatCol(col1);
  context.fillRect(0, 0, width, height);

  context.fillStyle = formatCol(col2);
  context.beginPath();
  context.arc(width / 2, height / 2, rad, 0, 2 * Math.PI);
  context.fill();
};
