import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import ColourPanel from "./ColourPanel/ColourPanel";

interface PanelFactoryProps {
  colours: number[][];
  setColours: React.Dispatch<React.SetStateAction<number[][]>>;
}

export const PanelFactory: React.FC<PanelFactoryProps> = ({
  colours,
  setColours,
}) => {
  const [activePickers, setActivePickers] = useState([true]);

  const modifyColour = (
    index: number,
    newCol: number[],
    prevState: number[][]
  ) => {
    const newState = prevState.slice();
    newState[index] = newCol;
    setColours(newState);
  };

  const addColour = () => {
    setColours((prevState) => [...prevState, [180, 50, 50]]);
    setActivePickers((prevState) => [...prevState, false]);
  };

  const removeColour = (index: number) => {
    if (index === 0 && colours.length === 1) return;
    setColours((prevState) => prevState.filter((_, idx) => idx !== index));

    const indexBeforeSelected =
      index < activePickers.length - 1 && activePickers[index + 1];
    const selectedIsLast = activePickers[activePickers.length - 1];
    const indexIsSelected = activePickers[index];

    if (indexBeforeSelected || selectedIsLast) {
      //if the picker after the selected picker is active,
      //or the selected picker is the last one (regardless of selection)
      //then remove the first element
      const [, ...newState] = activePickers;
      setActivePickers(newState);
    } else if (indexIsSelected) {
      //if the picker is the selected picker (except for when the picker is the last element)
      //then remove the last element
      const newState = activePickers.slice(0, -1);
      setActivePickers(newState);
    } else {
      //otherwise, remove the selected element from the array
      setActivePickers((prevState) =>
        prevState.filter((_, idx) => idx !== index)
      );
    }
  };

  const onPanelClick = (index: number) => {
    setActivePickers((prevState) => prevState.map((_, idx) => idx === index));
  };

  const movePanelUp = (index: number) => {
    if (index === 0) return;
    const copy = colours.slice();

    const temp = copy[index];
    copy[index] = copy[index - 1];
    copy[index - 1] = temp;

    setColours(copy);
  };

  const movePanelDown = (index: number) => {
    if (index === colours.length - 1) return;
    const copy = colours.slice();

    const temp = copy[index];
    copy[index] = copy[index + 1];
    copy[index + 1] = temp;
    setColours(copy);
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
              movePanelUp={() => movePanelUp(idx)}
              movePanelDown={() => movePanelDown(idx)}
            />
          </Row>
        ))}
        <Row>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              paddingTop: "10px",
            }}
          >
            <input
              style={{ width: "100%" }}
              type="button"
              value="Add another colour"
              onClick={addColour}
            />
          </div>
        </Row>
      </Col>
    </Container>
  );
};

export default PanelFactory;
