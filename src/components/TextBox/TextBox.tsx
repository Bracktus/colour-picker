import { useState } from "react";
import { colourToString, isPartialColour, isValidColour, partialColStringToArr, validColStringToArr } from "./helpers";
import TextBoxInput from "./TextBoxInput";

interface TextBoxProps {
    colour: number[];
    setColour: (colour: number[]) => void;
    colourType: "HSV" | "RGB" | "RGBNormalised";
}

export const TextBox: React.FC<TextBoxProps> = ({colour, colourType, setColour}) => {
    const [text, setText] = useState("");
    const [active, setActive] = useState(false); 

    const onTextChange = (newText: string) => {
        setText(newText);
        if (isValidColour(newText, colourType)){
            const colourArray = validColStringToArr(newText, colourType);
            setColour(colourArray);
        } else if (isPartialColour(newText, colourType)){
            const colourArray = partialColStringToArr(newText, colourType);
            setColour(colourArray);
        }
    };

    const reset = () => {
        setText(colourToString(colour));
        setActive(false);
    };

    const activate = () => {
        setText(colourToString(colour));
        setActive(true);
    };

    return <TextBoxInput 
            text={active ? text : colourToString(colour) }
            onTextChange={onTextChange}
            onBlur={reset}
            onFocus={activate}
            />
};

export default TextBox;