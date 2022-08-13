import React from "react";
import { Col, Container, Row } from "react-bootstrap";

import Canvas from "../Canvas";
import HueSlider from "../HueSlider";

interface PickerProps {
  onChange: (col: number[]) => void;
  id: number;
  HSV: number[];
  width?: number;
  height?: number;
}

export const Picker: React.FC<PickerProps> = ({ onChange, id, HSV, width = 100, height = 100 }) => {
  const [hue, sat, val] = HSV;

  const onClick = (e: React.MouseEvent, _context: CanvasRenderingContext2D) => {
    const xPos = e.nativeEvent.offsetX;
    const yPos = height - e.nativeEvent.offsetY;
    onChange([hue, (xPos / width) * 100, (yPos / height) * 100]);
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
    const x = (sat / 100) * width;
    const y = height - ((val / 100) * height);
    context.beginPath();
    context.moveTo(x, y + 3);
    context.lineTo(x, y + 8);
    context.stroke();

    context.beginPath();
    context.moveTo(x, y - 3);
    context.lineTo(x, y - 8);
    context.stroke();

    context.beginPath();
    context.moveTo(x + 3, y);
    context.lineTo(x + 8, y);
    context.stroke();

    context.beginPath();
    context.moveTo(x - 3, y);
    context.lineTo(x - 8, y);
    context.stroke();
  };

  return (
    <Container>
      <Col>
        <Row>
          <div style={{padding: "10px"}}>
            <Canvas
              name={`${id}_picker`}
              draw={draw}
              onClick={onClick}
              width={width}
              height={height}
            />
          </div>
        </Row>
        <Row>
          <div style={{width: "100%"}}>
          <HueSlider
            hue={hue}
            onChange={(newHue) => onChange([newHue, sat, val])}
          />
          </div>
        </Row>
      </Col>
    </Container>
  );
};

export default Picker;
