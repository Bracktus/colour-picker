import { useState } from "react";
import Canvas from "./Canvas";
import { HueSlider } from "./HueSlider";

export const ColourPanel = () => {
    const [hue, setHue] = useState(0);
    const [colour, setColour] = useState("#ffffff");

    const width = 300;
    const height = 300;

    const draw = (context: CanvasRenderingContext2D) => {
       context.fillStyle = `hsl(${hue}, 100%, 50%)`;
       context.fillRect(0,0, width, height);

       const xGrad = context.createLinearGradient(0, 0, width, 0);
       xGrad.addColorStop(0, "rgba(255, 255, 255, 1");
       xGrad.addColorStop(1, "rgba(255, 255, 255, 0");
       context.fillStyle = xGrad;
       context.fillRect(0, 0, width, height);

       const yGrad = context.createLinearGradient(0, 0, 0, height);
       yGrad.addColorStop(0, "rgba(0, 0, 0, 0");
       yGrad.addColorStop(1, "rgba(0, 0, 0, 1");
       context.fillStyle = yGrad;
       context.fillRect(0, 0, width, height);
    };

    return (
        <div>
            <Canvas name="picker" draw={draw} width={width} height={height}/>
            <HueSlider width={width} hue={hue} onChange={e => setHue(parseInt(e.target.value))}/>
        </div>
    )
}