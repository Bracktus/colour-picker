import { useState } from "react";
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

  return (
      <>
      {colours.map((col, idx) => (
        <ColourPanel
          key={idx}
          id={idx}
          HSV={col}
          setHSV={(col) => modifyColour(idx, col, colours)}
        />
      ))}
      <p onClick={() => addColour(colours)}>Add a new colour</p>
      </>
  );
};

export default PanelFactory;
