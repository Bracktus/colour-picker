interface TextBoxProps {
    text: string;
    onChange: Function;
}

//Things I want this to do:
//Autocomplete commas for you.
//If you type in partial colours e.g. 100, 20, ...
//  Then it'll move the colour picker's cursor
export const TextBox: React.FC<TextBoxProps> = ({text, onChange}) => {
    //Needs to take in text as a prop,
    //because when you move cursor, this must change.
    const validColRegex = /^\s*([0-9]{1,3})\s*,?\s*([0-9]{1,3})\s*,?\s*([0-9]{1,3})\s*$/i;

    const formatColourString = (colourString: string) => {
        const [, ...matches] = colourString.match(validColRegex) || [];
        if (matches === []) {
            //This shouldn't happen
            throw new Error("Invalid colour string");
        } else {
            return matches.map(m => parseInt(m)).join(", ");
        }
    };

    const onFocus = () => {
        //on focus
    };

    const onBlur = () => {
        //on leave focus
    };

    const isValidColour = (colourString: string) => {
        //Tests if the colourString is in the form "num, num, num" where
        // - num is 1-3 digits long
        // - whitespace doesn't matter
        const inRange = (num: number, min: number, max:number) => num >= min && num <= max;
        const [, ...matches] = colourString.match(validColRegex) || [];

        //If it matches the regex
        if (matches !== []) {
            const validLen = matches.length === 3;
            const validRange = matches.every(m => inRange(parseInt(m), 0, 255)); //TODO make this vary from RGB/HSV
            return validLen && validRange;
        }

        return false;
    };

    const isPartialColour = (colourString: string) => {
        return true;
    }

    const handleTextChange: React.ChangeEventHandler<HTMLInputElement> = e => {
        const inputText = e.target.value.replace(/[^0-9,]/g, "");
        if (isValidColour(inputText)){
            const formatted = formatColourString(e.target.value);
            onChange(formatted);
        } else if (isPartialColour(inputText)){
            console.log("hello");
        }
    };

    return <input
            type="text"
            value={text}
            onChange={handleTextChange}
            onBlur={onBlur}
            onFocus={onFocus}
            />
}