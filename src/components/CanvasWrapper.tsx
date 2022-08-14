import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Sketches } from "../sketches/sketches";
import SketchSelector from "./SketchSelector";
import Canvas from "./Canvas";

interface CanvasWrapperProps {
  colours: number[][];
  sketches: Sketches;
}

export const CanvasWrapper: React.FC<CanvasWrapperProps> = ({
  colours,
  sketches,
}) => {
  const [funcName, setFuncName] = useState("Default");
  const drawFunc = Object.values(sketches)
    .flat()
    .find((sketch) => funcName === sketch.name).func;

  return (
    <Container>
      <Col>
        <Row>
        <SketchSelector
          setFuncName={setFuncName}
          colours={colours}
          sketches={sketches}
        />
        </Row>          
      <Row>
      <Canvas
        name="my_canvas"
        draw={(ctx) => drawFunc(ctx, colours)}
        height={500}
        width={500}
      />
      </Row>
      </Col>
    </Container>
  );
};

export default CanvasWrapper;
