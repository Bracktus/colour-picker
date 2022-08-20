import { formatCol } from "./helpers";

export const border = (
  context: CanvasRenderingContext2D,
  colours: number[][]
) => {
  const width = context.canvas.width;
  const height = context.canvas.height;

  const [col1, col2, col3] = colours;
  const rad = Math.min(width, height) / 4;

  context.fillStyle = formatCol(col1);
  context.fillRect(0, 0, width, height);

  context.beginPath();
  context.arc(width / 2, height / 2, rad, 0, 2 * Math.PI);

  //Circle
  context.fillStyle = formatCol(col2);
  context.fill();

  //Border
  context.lineWidth = 3;
  context.strokeStyle = formatCol(col3);
  context.stroke();
};
