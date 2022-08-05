import React, { useEffect, useRef, useState } from "react"

interface canvasProps {
    name: string;
    width?: number;
    height?: number;
    draw: (context: CanvasRenderingContext2D) => void;
    onClick?: (e: React.MouseEvent, context: CanvasRenderingContext2D) => void;
}
const nop = () => undefined;

export const Canvas = ({name, width, height, draw, onClick = nop }: canvasProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);
    const [mouseDown, setMouseDown] = useState(false);

    useEffect(() => {
        if (canvasRef.current){
            const renderCtx = canvasRef.current.getContext("2d");
            if (renderCtx) setContext(renderCtx);
        }
    }, [context])
    
    useEffect(() => {
        if (context && canvasRef.current) {
            context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
            draw(context);
        }
    }, [context, draw])

    const handleMouseDown = (e: React.MouseEvent) => {
        context && onClick(e, context);
        setMouseDown(true);
    };

    const handleMouseUp = (e: React.MouseEvent) => {
        setMouseDown(false);
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        mouseDown && context && onClick(e, context);
    }
    
    //https://stackoverflow.com/questions/54281842/activating-the-onmousemove-event-only-when-the-onmousedown-event-is-activate
    return (
        <canvas ref={canvasRef} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp} onMouseDown={handleMouseDown} id={name} width={width} height={height}/>
    )
};

export default Canvas;