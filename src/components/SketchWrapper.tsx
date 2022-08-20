import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Sketches } from "../sketches/sketches";
import SketchSelector from "./SketchSelector";
import Canvas from "./Canvas";

interface SketchWrapperProps {
  colours: number[][];
  sketches: Sketches;
}

export const SketchWrapper: React.FC<SketchWrapperProps> = ({
  colours,
  sketches,
}) => {
  const [funcName, setFuncName] = useState({ key: "1", name: "Default" });
  if (/[0-9]+$/.test(funcName.key) && colours.length < parseInt(funcName.key)) {
    setFuncName({ key: "1", name: "Default" });
  }

  const getDrawFunc = () => {
    const func = sketches[funcName.key].find(
      (sketch) => sketch.name === funcName.name
    );
    if (func == null) throw Error("Couldn't find sketch");
    return func;
  };

  return (
    <Container>
      <Col>
        {colours.length > 0 && (
          <>
            <Row>
              <SketchSelector
                funcName={funcName}
                setFuncName={setFuncName}
                colours={colours}
                sketches={sketches}
              />
            </Row>
            <Row>
              <Canvas
                name="my_canvas"
                draw={(ctx) => getDrawFunc().func(ctx, colours)}
                height={500}
                width={500}
              />
            </Row>
          </>
        )}
      </Col>
    </Container>
  );
};

export default SketchWrapper;
