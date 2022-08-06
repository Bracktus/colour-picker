import { useCallback, useState } from "react"
import Picker from "../Picker";
import Swatch from "../Swatch";
import { formatColour, getHexString, HSVtoRGB } from "./helpers";

export const ColourPanel = () => {
    const [RGB, setRGB] = useState([0, 0, 0]);
    const [HSV, setHSV] = useState([0, 0, 0]);
    const [hexString, setHexString] = useState("");
    const [showPicker, setShowPicker] = useState(true);

    const pickerOnChange = useCallback((h: number, s: number, v: number)  => {
        setHSV([h,s,v]);
        const [r, g, b] = HSVtoRGB(h,s,v)
        setRGB([r, g, b]);
        setHexString(getHexString(r, g, b));
    }, []);

    return (
        <div>
            {showPicker && 
                <Picker onOutsideClick={() => {setShowPicker(false)}}
                        onChange={pickerOnChange}
                        rgbString={formatColour("rgb", RGB)}
                />
            }
            <p>{hexString}</p>
            <Swatch/>
            <p>{formatColour("hsv", HSV)}</p>
            <p>{formatColour("rgb", RGB)}</p>

        </div>
    )
}