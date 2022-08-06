interface SwatchProps {
    colourString: string
    onClick: (e: React.MouseEvent) => void
}

export const Swatch: React.FC<SwatchProps> = ({colourString, onClick}) => {
    const style = {
        borderRadius: "50%",
        background: colourString,
        margin: "10px",
        height: "30px",
        width: "30px"
    }
    return <div style={style} onClick={onClick}/>
};

export default Swatch;