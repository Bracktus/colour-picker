import context from "react-bootstrap/esm/AccordionContext";
import { formatCol } from "./helpers";

export const sine = (
  context: CanvasRenderingContext2D,
  colours: number[][]
) => {
  const width = context.canvas.width;
  const height = context.canvas.height;

  const amp = height * 0.3;
  const freq = width * 0.1;
  const [col1, col2] = colours;

  //BG
  context.fillStyle = formatCol(col1);
  context.fillRect(0, 0, width, height);

  //Wave
  context.strokeStyle = formatCol(col2);
  context.beginPath();
  for (let x = 0; x < width; x += 1) {
    let y = amp * Math.sin(x / freq) + height / 2;
    context.moveTo(x, y);
    let newY = amp * Math.sin((x + 1) / freq) + height / 2;
    context.lineTo(x + 1, newY);
  }

  context.closePath();
  context.lineWidth = 5;
  context.stroke();
};
