interface SwatchProps {
  colourString: string;
}

export const Swatch: React.FC<SwatchProps> = ({ colourString }) => {
  const style = {
    borderRadius: "50%",
    background: colourString,
    height: "23px",
    width: "23px",
    cursor: "pointer",
  };
  return <div style={style} />;
};

export default Swatch;
