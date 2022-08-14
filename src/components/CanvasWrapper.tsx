import { useState } from "react";
import { Sketches } from "../sketches/sketches";
import Canvas from "./Canvas";
import { SketchSelector } from "./SketchSelector";

interface CanvasWrapperProps {
  colours: number[][];
  sketches: Sketches;
}

export const CanvasWrapper: React.FC<CanvasWrapperProps> = ({ colours, sketches }) => {
  const width = 800;
  const height = 800;

  //Looks confusing but it's how to store a function in state
  // https://dev.to/sarioglu/how-to-store-a-function-using-react-usestate-4ffh
  const [funcName, setFuncName] = useState("Default");
  const drawFunc = Object.values(sketches).flat().find(sketch => funcName === sketch.name).func;

  return (
    <div>
      <SketchSelector setFuncName={setFuncName} colours={colours} sketches={sketches} />
      <Canvas
        name="my_canvas"
        draw={(ctx) => drawFunc(ctx, colours)}
        width={width}
        height={height}
      ></Canvas>
    </div>
  );
};

export default CanvasWrapper;
