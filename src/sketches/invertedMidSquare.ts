import { formatCol } from "./helpers";

export const invertedMidSquare = (
    context: CanvasRenderingContext2D,
    colours: number[][]
) => {
    const width = context.canvas.width;
    const height = context.canvas.height;

    const len = Math.min(width, height)/4;
    const [col1, col2, col3] = colours;
    
    //BG
    context.fillStyle = formatCol(col1);
    context.fillRect(0, 0, width, height);

    //Top Square
    context.fillStyle = formatCol(col2);
    const topX = width/2 - len/2;
    const topY = height/2 - len/2;
    context.fillRect(topX, topY, len, len/2);
    
    //Bot Square
    context.fillStyle = formatCol(col3);
    const botX = width/2 - len/2;
    const botY = height/2;
    context.fillRect(botX, botY, len, len/2);
}