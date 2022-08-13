import { Form } from "react-bootstrap";
import "../css/HueSlider.css";

interface HueSliderProps {
  hue: number;
  onChange: (hue: number) => void;
  width?: number
}

export const HueSlider: React.FC<HueSliderProps> = ({
  hue,
  onChange,
  width
}) => {

  return (
    <Form.Range
      className="slider"
      onChange={(e) => onChange(parseInt(e.target.value))}
      value={hue}
      max={360}
      step="1"
      width={width}
      bsPrefix={'hueslider'}
    ></Form.Range>
  );
};

export default HueSlider;
