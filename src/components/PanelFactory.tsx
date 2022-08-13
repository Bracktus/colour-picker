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
    //Not functional style, but this'll be ran every time the mouse moves.
    //So it needs to be pretty fast.
    const newState = prevState.slice();
    newState[index] = newCol;
    setColours(newState);
  };

  const addColour = () => {
    setColours(prevState => [...prevState, [180, 50, 50]]);
    setActivePickers(prevState => [...prevState, false]);
  };

  const removeColour = (index: number) => {
    setColours(prevState => prevState.filter((_, idx) => idx !== index));

    const indexBeforeSelected = index < activePickers.length - 1 && activePickers[index + 1];
    const selectedIsLast = activePickers[activePickers.length - 1];
    const indexIsSelected = activePickers[index];

    if (indexBeforeSelected || selectedIsLast){
      //if the picker after the selected picker is active,
      //or the selected picker is the last one (regardless of selection)
      //then remove the first element
      const [, ...newState] = activePickers;
      setActivePickers(newState);
    } else if (indexIsSelected) {
      //if the picker is the selected picker (except for when the picker is the last element)
      //then remove the last element
      const newState = activePickers.slice(0, -1)
      setActivePickers(newState);
    } else {
      //otherwise, remove the selected element from the array
      setActivePickers(prevState => prevState.filter((_, idx) => idx !== index));
    }
  };

  const onPanelClick = (index: number) => {
    setActivePickers(prevState => prevState.map((_, idx) => idx === index));
  };

  return (
      <Container>
        <Col>
          {colours.map((col, idx) => (
            <Row key={idx}>
              <ColourPanel
                id={idx}
                HSV={col}
                setHSV={(col) => modifyColour(idx, col, colours)}
                removePanel={() => removeColour(idx)}
                onClick={() => onPanelClick(idx)}
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
