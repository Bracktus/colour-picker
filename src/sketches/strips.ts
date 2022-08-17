import { formatCol } from "./helpers";

export const strips = (
  context: CanvasRenderingContext2D,
  colours: number[][]
) => {
  const width = context.canvas.width;
  const height = context.canvas.height;

  const stripHeight = height / (((colours.length - 1) * 3 ) + 1);
  const stripWidth = width * 0.9;

  context.fillStyle = formatCol(colours[0]);
  context.fillRect(0, 0, width, height);
  
  let y = stripHeight;
  for (let i = 0; i < colours.length - 1; i++) {
    const x = width * 0.05;
    context.fillStyle = formatCol(colours[i + 1]);
    context.fillRect(
      x, 
      y, 
      stripWidth,
      stripHeight * 2
    );

    y += stripHeight * 3;
  }
};
