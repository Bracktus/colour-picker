import "../css/HueSlider.css";

interface HueSliderProps {
  width: number;
  hue: number;
  onChange: (hue: number) => void;
}

export const HueSlider: React.FC<HueSliderProps> = ({
  hue,
  onChange,
  width,
}) => {
  const style = {
    background:
      "linear-gradient(to right, hsl(0, 100%, 50%) 0%,hsl(30, 100%, 50%) 8.3%,hsl(60, 100%, 50%) 16.6%,hsl(90, 100%, 50%) 25%,hsl(120, 100%, 50%) 33.3%,hsl(150, 100%, 50%) 41.6%,hsl(180, 100%, 50%) 50%,hsl(210, 100%, 50%) 58.3%, hsl(240, 100%, 50%) 66.6%, hsl(270, 100%, 50%) 75%, hsl(300, 100%, 50%) 83.3%, hsl(330, 100%, 50%) 91.6%, hsl(360, 100%, 50%) 100%)",
    width: width,
  };

  return (
    <input
      className="slider"
      type="range"
      onChange={e => onChange(parseInt(e.target.value))}
      value={hue}
      max={360}
      style={style}
      step="1"
    ></input>
  );
};

export default HueSlider;
