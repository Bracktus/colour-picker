import { formatCol } from "./helpers";

export const midSquare = (
    context: CanvasRenderingContext2D,
    colours: number[][]
) => {
    const width = context.canvas.width;
    const height = context.canvas.height;

    const len = Math.min(width, height)/4;
    const [col1, col2, col3] = colours;

    //Top Half
    context.fillStyle = formatCol(col1);
    context.fillRect(0, 0, width, height/2);
    
    //Bottom Half
    context.fillStyle = formatCol(col2);
    context.fillRect(0, height/2, width, height);

    //Square in the middle
    const x = width/2 - len/2;
    const y = height/2 - len/2;
    context.fillStyle = formatCol(col3);
    context.fillRect(x, y, len, len);
}