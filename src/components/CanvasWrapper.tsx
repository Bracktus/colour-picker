import { useState } from "react"
import Canvas from "./Canvas";

export const CanvasWrapper = () => {
    const [selected, setSelected] = useState("option-1");
    const width = 400;
    const height = 400;
    
    const draw = (context: CanvasRenderingContext2D) => {
        context.fillStyle = "#000000";
        context.fillRect(0, 0, width, height);
    };
    
    const draw2 = (context: CanvasRenderingContext2D) => {
        context.fillStyle = "#ff6666";
        context.fillRect(0, 0, width, height);
    };
    
    const getDraw = (context: CanvasRenderingContext2D) =>{
        switch (selected) {
            case "option-1":
                draw(context);
                break;
            case "option-2":
                draw2(context);
                break;
        }
    }
    
    return ( 
        <div>
        <form>
            <label>
                <input 
                    type="radio"
                    name="canvas-radio"
                    value="option-1"
                    checked={selected === "option-1"}
                    onChange={() => setSelected("option-1")}
                />
                option-1
            </label>
                
            <label>
                <input 
                    type="radio"
                    name="canvas-radio"
                    value="option-2"
                    checked={selected === "option-2"}
                    onChange={() => setSelected("option-2")}
                />
                option-2
            </label>
            
        </form>
        <Canvas name="my_canvas" draw={getDraw} width={width} height={height}></Canvas>
        </div>
    );
};

export default CanvasWrapper;
