import React, { useEffect, useRef, useState } from "react";

interface CanvasProps {
  name: string;
  width?: number;
  height?: number;
  draw: (context: CanvasRenderingContext2D) => void;
  onClick?: (e: React.MouseEvent, context: CanvasRenderingContext2D) => void;
}

const nop = () => undefined;

export const Canvas: React.FC<CanvasProps> = ({
  name,
  width,
  height,
  draw,
  onClick = nop,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);
  const [mouseDown, setMouseDown] = useState(false);

  useEffect(() => {
    // Set the context from the canvas reference
    if (canvasRef.current) {
      const renderCtx = canvasRef.current.getContext("2d");
      if (renderCtx) setContext(renderCtx);
    }
  }, [context]);

  useEffect(() => {
    if (context && canvasRef.current) {
      canvasRef.current.width = canvasRef.current.offsetWidth;
      canvasRef.current.height = canvasRef.current.offsetHeight;
      draw(context);
    }
  }, [context, draw]);

  useEffect(() => {
    const onResize = () => {
      if (canvasRef.current && context) {
        canvasRef.current.width = canvasRef.current.offsetWidth;
        canvasRef.current.height = canvasRef.current.offsetHeight;
        draw(context);
      }
    };

    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [context, draw]);

  const handleMouseDown = (e: React.MouseEvent) => {
    context && onClick(e, context);
    setMouseDown(true);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    mouseDown && context && onClick(e, context);
  };

  const handleMouseEnter = (e: React.MouseEvent) => {
    //Handles the edge case where if we hold the mouse down
    //and enter the canvas it counts as us holding the mouse down
    e.buttons === 1 && setMouseDown(true);
  };

  return (
    <canvas
      style={{ padding: "0px" }}
      ref={canvasRef}
      onMouseEnter={handleMouseEnter}
      onMouseOut={() => setMouseDown(false)}
      onMouseMove={handleMouseMove}
      onMouseUp={() => setMouseDown(false)}
      onMouseDown={handleMouseDown}
      id={name}
      width={width}
      height={height}
    />
  );
};

export default Canvas;
