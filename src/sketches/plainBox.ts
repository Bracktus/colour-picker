import { formatCol } from "./helpers";

export const plainBox = (context: CanvasRenderingContext2D, colours: number[][]) => {
    const width = context.canvas.width;
    const height = context.canvas.width;

    const col = colours[0];
    context.fillStyle = formatCol(col);
    context.fillRect(0, 0, width, height);
}
