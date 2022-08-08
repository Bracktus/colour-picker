interface SwatchProps {
  colourString: string;
}

export const Swatch: React.FC<SwatchProps> = ({ colourString }) => {
  const style = {
    borderRadius: "50%",
    background: colourString,
    margin: "10px",
    height: "30px",
    width: "30px",
    cursor: "pointer",
  };
  return <div style={style} />;
};

export default Swatch;
