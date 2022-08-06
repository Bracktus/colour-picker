import { useCallback, useState } from "react"
import Picker from "../Picker/Picker";
import Swatch from "../Swatch";
import { formatColour, getHexString, HSVtoRGB } from "./helpers";

const divStyle = {
    border: "solid black 1px"
}

interface ColourPanelProps {
    id: number;
}

export const ColourPanel: React.FC<ColourPanelProps> = ({id}) => {
    const [RGB, setRGB] = useState([0, 0, 0]);
    const [HSV, setHSV] = useState([0, 0, 0]);
    const [hexString, setHexString] = useState("");
    const [showPicker, setShowPicker] = useState(true);

    const pickerOnChange = useCallback((h: number, s: number, v: number)  => {
        setHSV([h,s,v]);
        const [r, g, b] = HSVtoRGB(h,s,v);
        setRGB([r, g, b]);
        setHexString(getHexString(r, g, b));
    }, []);

    return (
        <div style={divStyle}>
            {showPicker && 
                <Picker onOutsideClick={() => {setShowPicker(false)}}
                        onChange={pickerOnChange}
                        id={id}
                />
            }
            <p>{hexString}</p>
            <Swatch colourString={formatColour("rgb", RGB)}
                    onClick={() => setShowPicker(true)}/>
            <p>{formatColour("hsv", HSV)}</p>
            <p>{formatColour("rgb", RGB)}</p>
        </div>
    )
}