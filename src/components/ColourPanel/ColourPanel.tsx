import { useCallback, useRef, useState } from "react";
import Picker from "../Picker/Picker";
import Swatch from "../Swatch";
import { TextBox } from "../TextBox/TextBox";
import { formatColour, getHexString, HSVtoRGB, RGBtoHSV, useOutsideAlerter } from "./helpers";

const divStyle = {
  border: "solid black 1px",
};

interface ColourPanelProps {
  id: number;
}

export const ColourPanel: React.FC<ColourPanelProps> = ({ id }) => {
  const [RGB, setRGB] = useState([0, 0, 0]);
  const [HSV, setHSV] = useState([0, 0, 0]);
  const [showPicker, setShowPicker] = useState(true);

  //If we click outside of the div, hide the picker
  const containerRef = useRef<HTMLDivElement>(null);
  useOutsideAlerter(containerRef, () => setShowPicker(false));

  const pickerOnChange = useCallback((h: number, s: number, v: number) => {
    setHSV([h, s, v]);
    setRGB(HSVtoRGB(h, s/100, v/100));
  }, []);

  return (
    <div style={divStyle} ref={containerRef} onClick={() => setShowPicker(true)}>
      {showPicker && (
        <Picker
          onChange={pickerOnChange}
          id={id}
          HSV={HSV}
          setHSV={setHSV}
        />
      )}
      
      <p>{getHexString(RGB[0], RGB[1], RGB[2])}</p>
      <Swatch
        colourString={formatColour("rgb", RGB)}
      />


      <p>HSV</p>
      <TextBox 
        colour={HSV} 
        setColour={col => {
          setHSV(col);
          setRGB(HSVtoRGB(col[0], col[1]/100, col[2]/100));
        }} 
        colourType={"HSV"}/>

      {/*TODO Updates to HSV, also updates picker, which in turn updates RGB*/}
      {/* Updates to RGB only change RGB, therefore this is bugged*/}
      <p>RGB</p>
      <TextBox 
        colour={RGB} 
        setColour={col => {
          setRGB(col); 
          setHSV(RGBtoHSV(col[0]/255, col[1]/255, col[2]/255))
        }}
        colourType={"RGB"}/>
    </div>
  );
};
