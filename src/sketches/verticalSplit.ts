import { formatCol } from "./helpers";

export const verticalSplit = (context: CanvasRenderingContext2D, colours: number[][]) => {
    const width = context.canvas.width;
    const height = context.canvas.height;

    const [col1, col2] = colours;
    context.fillStyle = formatCol(col1);
    context.fillRect(0, 0, width/2, height);

    context.fillStyle = formatCol(col2);
    context.fillRect(width/2, 0, width, height);
};