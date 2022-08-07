import React, { useEffect, useRef, useState } from "react";
import {
  EventListnerFunc,
  getFromStorage,
  setStorage,
  useOutsideAlerter,
} from "./helpers";
import Canvas from "../Canvas";
import HueSlider from "../HueSlider";


interface MousePosition {
  x: number;
  y: number;
}

interface PickerProps {
  onOutsideClick: EventListnerFunc;
  onChange: Function;
  id: number;
}

export const Picker: React.FC<PickerProps> = ({
  onOutsideClick,
  onChange,
  id,
}) => {
  const width = 300;
  const height = 300;

  /* 
    Here we're retriving state from session storage.
    I'm not sure if the is the best solution, but it's hard to store the state in
    the parent because we end up in an infinite loop if we
    update child -> pass state up to parent -> cause parent refresh -> update child

    We'll also run into issues of assigning unique id's to each list and keeping the state
    consistent. We could make the storage one big object instead, but the deserialising
    might get a bit complex (and expensive);
  */
  const defaultHSV = [180, width / 2, height / 2];
  const [hue, setHue] = useState(getFromStorage(id, defaultHSV)[0]);
  const [cursorPos, setCursorPos] = useState<MousePosition>({
    x: getFromStorage(id, defaultHSV)[1],
    y: getFromStorage(id, defaultHSV)[2],
  });

  const containerRef = useRef<HTMLDivElement>(null);
  useOutsideAlerter(containerRef, onOutsideClick);

  useEffect(() => {
    const clamp = (num: number) => Math.max(Math.min(num, 1), 0);
    const sat = clamp(cursorPos.x / width);
    const val = clamp((height - cursorPos.y) / height);

    setStorage(id, [hue, cursorPos.x, cursorPos.y]);
    onChange(hue, sat, val);
  }, [hue, cursorPos, onChange, id]);

  const draw = (context: CanvasRenderingContext2D) => {
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
    setCursorPos({ x: xPos, y: yPos });
  };

  return (
    <div ref={containerRef}>
      <HueSlider width={width} hue={hue} onChange={setHue} />
      <Canvas
        name="picker"
        draw={draw}
        width={width}
        height={height}
        onClick={onClick}
      />
    </div>
  );
};

export default Picker;
