import React from "react";

import Canvas from "../Canvas";
import HueSlider from "../HueSlider";

interface MousePosition {
  x: number;
  y: number;
}

interface PickerProps {
  onChange: Function;
  id: number;
  HSV: number[];
  setHSV: React.Dispatch<React.SetStateAction<number[]>>
}

export const Picker: React.FC<PickerProps> = ({
  onChange,
  id,
  HSV,
}) => {
  const [hue, sat, val] = HSV;
  const width = 300;
  const height = 300;

  const cursorPos: MousePosition = { 
    x: (sat/100)*width, 
    y: (val/100)*height
  };

  const onClick = (e: React.MouseEvent, _context: CanvasRenderingContext2D) => {
    const clamp = (v: number) => Math.min(Math.max(0, v), 1)
    const xPos = e.nativeEvent.offsetX;
    const yPos = e.nativeEvent.offsetY;
    onChange(hue, clamp(xPos/width) * 100, clamp(yPos/height) * 100)
  };

  const draw = (context: CanvasRenderingContext2D) => {
    //Draw the Gradient
    context.fillStyle = `hsl(${hue}, 100%, 50%)`;
    context.fillRect(0, 0, width, height);

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

    context.strokeStyle = "rbga(0,0,0,1)";

    //Draw our cursor on the canvas
    context.beginPath();
    context.moveTo(cursorPos.x, cursorPos.y + 3);
    context.lineTo(cursorPos.x, cursorPos.y + 8);
    context.stroke();

    context.beginPath();
    context.moveTo(cursorPos.x, cursorPos.y - 3);
    context.lineTo(cursorPos.x, cursorPos.y - 8);
    context.stroke();

    context.beginPath();
    context.moveTo(cursorPos.x + 3, cursorPos.y);
    context.lineTo(cursorPos.x + 8, cursorPos.y);
    context.stroke();

    context.beginPath();
    context.moveTo(cursorPos.x - 3, cursorPos.y);
    context.lineTo(cursorPos.x - 8, cursorPos.y);
    context.stroke();
  };

  return (
    <div>
      <HueSlider width={width} hue={hue} onChange={newHue => onChange(newHue, sat, val)} />
      <Canvas
        name={`${id}_picker`}
        draw={draw}
        width={width}
        height={height}
        onClick={onClick}
      />
    </div>
  );
};

export default Picker;
