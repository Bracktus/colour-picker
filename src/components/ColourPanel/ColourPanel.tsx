import React, { useEffect, useState } from "react";
import Canvas from "../Canvas";
import { HueSlider } from "../HueSlider";
import { formatColour, HSVtoRGB } from "./helpers";

const divStyle = {
    display: "flex",
    flexFlow: "column wrap"
}

interface MousePosition {
    x: number,
    y: number
};

export const ColourPanel = () => {
    const width = 300;
    const height = 300;

    const [hue, setHue] = useState(180);
    const [RGB, setRGB] = useState([0, 0, 0]);
    const [HSV, setHSV] = useState([0, 0, 0]);
    const [cursorPos, setCursorPos] = useState<MousePosition>({x: width/2, y:height/2});

    const pStyle = {
        color: formatColour("rgb", RGB)
    }

    useEffect(() => {
        const clamp = (num: number) => Math.max(Math.min(num, 1), 0);
        const sat = clamp(cursorPos.x / width);
        const val = clamp((height - cursorPos.y) / height);
        setHSV([hue, sat * 100, val * 100]);
        setRGB(HSVtoRGB(hue, sat, val));
    },[hue, cursorPos])

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

       context.beginPath();
       context.arc(cursorPos.x, cursorPos.y, 10, 0, 2 * Math.PI);
       context.fillStyle = formatColour("rgb", RGB);
       context.stroke();
       context.fill();
    };

    const onClick = (e: React.MouseEvent, context: CanvasRenderingContext2D) => {
        const xPos = e.nativeEvent.offsetX;
        const yPos = e.nativeEvent.offsetY;
        setCursorPos({x: xPos, y: yPos});
    }

    return (
        <div style={divStyle}>
            <HueSlider width={width} hue={hue} onChange={setHue}/>
            <Canvas name="picker" draw={draw} width={width} height={height} onClick={onClick}/>
            <p style={pStyle}>{formatColour("rgb", RGB)}</p>
            <p style={pStyle}>{formatColour("hsv", HSV)}</p>
        </div>
    )
}

export default ColourPanel;