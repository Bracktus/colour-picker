import React from "react";
import { Col, Container, Row } from "react-bootstrap";

import Canvas from "./Canvas";
import HueSlider from "./HueSlider";

interface PickerProps {
  onChange: (col: number[]) => void;
  id: number;
  HSV: number[];
}

export const Picker: React.FC<PickerProps> = ({ onChange, id, HSV }) => {
  const [hue, sat, val] = HSV;

  const mousePos = (context: CanvasRenderingContext2D) => {
    return {
      x: (sat / 100) * context.canvas.width,
      y: context.canvas.height - (val / 100) * context.canvas.height,
    };
  };

  const onClick = (e: React.MouseEvent, context: CanvasRenderingContext2D) => {
    const canvas = context.canvas;
    const rect = canvas.getBoundingClientRect();

    const width = canvas.width;
    const height = canvas.height;

    const xPos = ((e.clientX - rect.left) / rect.width) * width;
    const yPos = ((e.clientY - rect.top) / rect.height) * height;
    onChange([hue, (xPos / width) * 100, 100 - (yPos / height) * 100]);
  };

  const draw = (context: CanvasRenderingContext2D) => {
    const width = context.canvas.width;
    const height = context.canvas.height;
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

    //Draw our cursor on the canvas
    const pos = mousePos(context);
    const x = pos.x;
    const y = pos.y;

    context.strokeStyle = "rbg(255,255,255)";

    context.beginPath();
    context.moveTo(x, y + 3);
    context.lineTo(x, y + 6);
    context.stroke();

    context.beginPath();
    context.moveTo(x, y - 3);
    context.lineTo(x, y - 6);
    context.stroke();

    context.beginPath();
    context.moveTo(x + 3, y);
    context.lineTo(x + 6, y);
    context.stroke();

    context.beginPath();
    context.moveTo(x - 3, y);
    context.lineTo(x - 6, y);
    context.stroke();
  };

  return (
    <Container>
      <Col>
        <Row>
          <Canvas name={`${id}_picker`} draw={draw} onClick={onClick} />
        </Row>
        <Row>
          <HueSlider
            hue={hue}
            onChange={(newHue) => onChange([newHue, sat, val])}
          />
        </Row>
      </Col>
    </Container>
  );
};

export default Picker;
