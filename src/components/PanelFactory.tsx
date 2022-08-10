import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import ColourPanel from "./ColourPanel/ColourPanel";

export const PanelFactory: React.FC = () => {
  const [colours, setColours] = useState([[180, 50, 50]]);

  const modifyColour = (
    index: number,
    newCol: number[],
    prevState: number[][]
  ) => {
    const newState = prevState.map((colour, colIdx) =>
      colIdx === index ? newCol : colour
    );
    setColours(newState);
  };

  const addColour = (prevState: number[][]) => {
    setColours([...prevState, [180, 50, 50]])
  };

  const removeColour = (prevState: number[][], index: number) => {
    const newState = prevState.filter((_, idx) => idx !== index);
    setColours(newState);
  }

  return (
      <Container>
        <Col>
          {colours.map((col, idx) => (
            <Row>
              <ColourPanel
                key={idx}
                id={idx}
                HSV={col}
                setHSV={(col) => modifyColour(idx, col, colours)}
                removePanel={() => removeColour(colours, idx)}
                canRemove={idx !== 0}
              />
            </Row>
          ))}
        <Row><input type="button" value="Add another colour" onClick={() => addColour(colours)}/></Row>
        </Col>
      </Container>
  );
};

export default PanelFactory;
