import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import ColourPanel from "./ColourPanel/ColourPanel";

export const PanelFactory: React.FC = () => {
  const [colours, setColours] = useState([[180, 50, 50]]);
  const [activePickers, setActivePickers] = useState([true]);

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

  const addColour = () => {
    setColours(prevState => [...prevState, [180, 50, 50]])
    setActivePickers(prevState => [...prevState, false])
  };

  const removeColour = (prevState: number[][], index: number) => {
    const newState = prevState.filter((_, idx) => idx !== index);
    setColours(newState);
  };

  const onPanelClick = (prevState: boolean[], index: number) => {
    const newState = prevState.map((_, idx) => idx === index);
    setActivePickers(newState);
  }

  return (
      <Container>
        <Col>
          {colours.map((col, idx) => (
            <Row key={idx}>
              <ColourPanel
                id={idx}
                HSV={col}
                setHSV={(col) => modifyColour(idx, col, colours)}
                removePanel={() => removeColour(colours, idx)}
                onClick={() => onPanelClick(activePickers, idx)}
                showPicker={activePickers[idx]}
              />
            </Row>
          ))}
        <Row><input type="button" value="Add another colour" onClick={addColour}/></Row>
        </Col>
      </Container>
  );
};

export default PanelFactory;
