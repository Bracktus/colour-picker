import { useEffect, useRef, useState } from "react"

interface canvasProps {
    name: string;
    width?: number;
    height?: number;
    draw: Function;
    onClick?: Function;
}

export const Canvas = ({name, width, height, draw}: canvasProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);

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

    return (
        <canvas ref={canvasRef} id={name} width={width} height={height} style={{border: "2px solid #000"}}/>
    )
};

export default Canvas;