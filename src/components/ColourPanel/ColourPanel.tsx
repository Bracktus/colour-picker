import { useRef, useState } from "react";
import Picker from "../Picker/Picker";
import Swatch from "../Swatch";
import TextBox from "../TextBox/TextBox";
import {
  formatColour,
  getHexString,
  HSVtoRGB,
  RGBtoHSV,
  useOutsideAlerter,
} from "./helpers";

interface ColourPanelProps {
  id: number;
  HSV: number[];
  setHSV: (HSV: number[]) => void;
}

export const ColourPanel: React.FC<ColourPanelProps> = ({
  id,
  HSV,
  setHSV,
}) => {
  const [RGB, setRGB] = useState([0, 0, 0]);
  const [showPicker, setShowPicker] = useState(true);

  //If we click outside of the div, hide the picker
  const containerRef = useRef<HTMLDivElement>(null);
  useOutsideAlerter(containerRef, () => setShowPicker(false));

  return (
    <div ref={containerRef} onClick={() => setShowPicker(true)} className="row">
      <div className="column">
        <div className="panelRow">
          <p>{getHexString(RGB[0], RGB[1], RGB[2])}</p>
          <Swatch colourString={formatColour("rgb", RGB)} />
        </div>

        <div className="panelRow">
          <p>HSV</p>
          <TextBox
            colour={HSV}
            setColour={(col) => {
              setHSV(col);
              setRGB(HSVtoRGB(col[0], col[1] / 100, col[2] / 100));
            }}
            colourType={"HSV"}
          />
        </div>

        <div className="panelRow">
          <p>RGB</p>
          <TextBox
            colour={RGB}
            setColour={(col) => {
              setRGB(col);
              setHSV(RGBtoHSV(col[0] / 255, col[1] / 255, col[2] / 255));
            }}
            colourType={"RGB"}
          />
        </div>
      </div>

      <div className="column">
        {showPicker && (
          <Picker
            onChange={(col) => {
              setHSV(col);
              setRGB(HSVtoRGB(col[0], col[1] / 100, col[2] / 100));
            }}
            id={id}
            HSV={HSV}
          />
        )}
      </div>
    </div>
  );
};
