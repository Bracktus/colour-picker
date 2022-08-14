import { formatCol } from "./helpers";

export const horizontalSplit = (context: CanvasRenderingContext2D, colours: number[][]) => {
    const width = context.canvas.width;
    const height = context.canvas.height;

    const [col1, col2] = colours;
    context.fillStyle = formatCol(col1);
    context.fillRect(0, 0, width, height/2);

    context.fillStyle = formatCol(col2);
    context.fillRect(0, height/2, width, height);
};