import React, { useEffect, useRef, useState } from "react";
import Canvas from "./Canvas";
import { HueSlider } from "./HueSlider";

const divStyle = {
    display: "flex",
    flexFlow: "column wrap"
};

type EventListnerFunc = (event: MouseEvent) => void

interface MousePosition {
    x: number,
    y: number
};

interface PickerProps {
    onOutsideClick: EventListnerFunc;
    onChange: Function;
    rgbString: string
};

const useOutsideAlerter = (ref: React.RefObject<HTMLDivElement> , handleOutsideClick: EventListnerFunc ) => {
    useEffect(() => {
      const handler: EventListnerFunc = event => {
        if (ref.current && !ref.current.contains(event.target as Node)) {
          handleOutsideClick(event);
        }
      }

      document.addEventListener("mousedown", handler);
      return () => {
        document.removeEventListener("mousedown", handler);
      };
    }, [ref, handleOutsideClick]);
};

export const Picker: React.FC<PickerProps> = ({onOutsideClick, onChange}) => {
    const width = 800;
    const height = 800;

    const [hue, setHue] = useState(180);
    const [cursorPos, setCursorPos] = useState<MousePosition>({x: width/2, y:height/2});

    const containerRef = useRef<HTMLDivElement>(null);
    useOutsideAlerter(containerRef, onOutsideClick);

    useEffect(() => {
        const clamp = (num: number) => Math.max(Math.min(num, 1), 0);
        const sat = clamp(cursorPos.x / width);
        const val = clamp((height - cursorPos.y) / height);
        onChange(hue, sat, val)
    }, [hue, cursorPos, onChange])

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

       context.strokeStyle = "rbga(0,0,0,1)"

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

    const onClick = (e: React.MouseEvent, _context: CanvasRenderingContext2D) => {
        const xPos = e.nativeEvent.offsetX;
        const yPos = e.nativeEvent.offsetY;
        setCursorPos({x: xPos, y: yPos});
    };

    return (
        <div style={divStyle} ref={containerRef}>
            <HueSlider width={width} hue={hue} onChange={setHue}/>
            <Canvas name="picker" draw={draw} width={width} height={height} onClick={onClick}/>
        </div>
    )
}

export default Picker;