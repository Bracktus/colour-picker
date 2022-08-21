import { formatCol } from "./helpers";

export const quadSplit = (
    context: CanvasRenderingContext2D,
    colours: number[][]
) => {
    const width = context.canvas.width;
    const height = context.canvas.height;
    
    const [col1, col2, col3, col4] = colours;
    
    const sqWidth = width/2;
    const sqHeight = height/2;
    
    //Top Left
    context.fillStyle = formatCol(col1);
    context.fillRect(0,0, sqWidth, sqHeight);
    
    //Bot Left
    context.fillStyle = formatCol(col2);
    context.fillRect(0, height/2, sqWidth, sqHeight);
    
    //Top Right
    context.fillStyle = formatCol(col3);
    context.fillRect(width/2, 0, sqWidth, sqHeight);

    //Bot Right
    context.fillStyle = formatCol(col4);
    context.fillRect(width/2, height/2, sqWidth, sqHeight);
}