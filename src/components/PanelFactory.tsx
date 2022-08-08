import { useState } from "react";
import { ColourPanel } from "./ColourPanel/ColourPanel";

export const PanelFactory: React.FC = () => {
  const [colours, setColours] = useState([[180, 100, 150]]);

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

  return (
    <div className="column">
      {colours.map((col, idx) => (
        <ColourPanel
          id={idx}
          HSV={col}
          setHSV={(col) => modifyColour(idx, col, colours)}
        />
      ))}
    </div>
  );
};

export default PanelFactory;
