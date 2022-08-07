export const validColRegex = /^\s*([0-9]{1,3})\s*,?\s*([0-9]{1,3})\s*,?\s*([0-9]{1,3})\s*$/;
export const partialColRegex = /^\s*([0-9]{1,3})\s*,?\s*([0-9]{1,3})\s*,?\s*$/;
export const colourToString = (values: number[]) => values.map(v => Math.round(v)).join(", ");

export type ColourType = "HSV" | "RGB" | "RGBNormalised";

//TODO: This system is too complicated. Take a 2nd look at this later
const rangeMapping = {
    "HSV": [360, 100, 100],
    "RGB": [255, 255, 255],
    "RGBNormalised": [1, 1, 1]
};

const regexMapping = {
    "HSV": {"valid": validColRegex, "partial": partialColRegex},
    "RGB": {"valid": validColRegex, "partial": partialColRegex},
    "RGBNormalised": {"valid": /h/, "partial": /h/},
}

export const validColStringToArr = (colourString: string, colType: ColourType) => {
    //Takes in a string like "233,  100,   3"
    //Turns it into [233, 100, 3]
    const re = regexMapping[colType].valid;
    const [, ...matches] = colourString.match(re) || [];
    if (matches === []) {
        //This shouldn't happen
        throw new Error("Invalid colour string");
    } else {
        return matches.map(m => parseInt(m));
    }
};

export const partialColStringToArr = (colourString: string, colType: ColourType) => {
    //Takes in a string like "100 16"
    //Turns it into [100, 16, 0]
    const re = regexMapping[colType].partial;
    const [, ...matches] = colourString.match(re) || [];
    if (matches.length === 1) {
        return [parseInt(matches[0]), 0, 0];
    } else if ( matches.length === 2) {
        return [parseInt(matches[0]), parseInt(matches[1]), 0];
    } else {
        throw new Error("Invalid partial colour string");
    }
};

export const isValidColour = (colourString: string, colType: ColourType) => {
    //Tests if the colourString is in the form "num, num, num" where
    // - num is 1-3 digits long
    // - whitespace doesn't matter
    // - num is in its correct range
    const inRange = (num: number, min: number, max: number) => num >= min && num <= max;
    const [, ...matches] = colourString.match(validColRegex) || [];
    const ranges = rangeMapping[colType];
    //If it matches the regex
    if (matches !== []) {
        const validLen = matches.length === 3;
        const validRange = matches.every((m, idx) => inRange(parseInt(m), 0, ranges[idx]));
        return validLen && validRange;
    }
    return false;
};

export const isPartialColour = (colourString: string, colType: ColourType) => {
    //Test is the colourString is in the form:
    //"num" or "num," or "num, num" or "num, num,"
    const re = regexMapping[colType].partial;
    const [, ...matches] = colourString.match(re) || [];
    return (matches.length === 1) || (matches.length === 2);
};