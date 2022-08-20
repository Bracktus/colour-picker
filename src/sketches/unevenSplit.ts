import { formatCol } from "./helpers";

export const unevenSplit = (
  context: CanvasRenderingContext2D,
  colours: number[][]
) => {
  const width = context.canvas.width;
  const height = context.canvas.height;

  const [col1, col2, col3] = colours;
  const vSplitRatio = 0.4;

  //Right half of canvas
  const rightWidth = width - (width * vSplitRatio);
  context.fillStyle = formatCol(col1);
  context.fillRect(width * vSplitRatio, 0, rightWidth, height);

  //Top left of canvas
  const topLen = height * 0.3;
  context.fillStyle = formatCol(col2);
  context.fillRect(0, 0, width * vSplitRatio, topLen);

  //Bottom left of canvas
  const botY = height - topLen;
  context.fillStyle = formatCol(col3);
  context.fillRect(0, topLen, width * vSplitRatio, botY);
}

