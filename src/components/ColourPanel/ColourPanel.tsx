import { useEffect, useRef, useState } from "react";
import { CloseButton, Col, Container, Row } from "react-bootstrap";
import Picker from "../Picker/Picker";
import Swatch from "../Swatch";
import TextBox from "../TextBox/TextBox";
import {
  formatColour,
  getHexString,
  HSVtoRGB,
  RGBtoHSV,
} from "./helpers";

interface ColourPanelProps {
  id: number;
  HSV: number[];
  setHSV: (HSV: number[]) => void;
  removePanel: () => void;
  showPicker: boolean;
  onClick: () => void;
}

export const ColourPanel: React.FC<ColourPanelProps> = ({
  id,
  HSV,
  setHSV,
  removePanel,
  showPicker,
  onClick
}) => {
  const [RGB, setRGB] = useState(HSVtoRGB(HSV[0], HSV[1] / 100, HSV[2] / 100));
  
  //If we click outside of the div, hide the picker
  const containerRef = useRef<HTMLDivElement>(null)
  
  const canvasParent = useRef<HTMLDivElement>(null);
  //This is horrible, but I'm not sure how else to achieve a correctly
  //scaled responsive canvas

  const pickerWidth = canvasParent.current ? canvasParent.current.offsetWidth : 490;
  const pickerHeight = canvasParent.current ? canvasParent.current.offsetWidth * 0.5 : undefined;

  useEffect(() => {
    setRGB(HSVtoRGB(HSV[0], HSV[1] / 100, HSV[2] / 100));
  }, [HSV])

  
  return (
    <div
      id="panelContainer"
      ref={containerRef}
      onClick={() => onClick()}
    >
      <Container fluid style={{border: "1px black solid", margin: "5px 0", borderRadius: "5px"}}>
        <Row style={{paddingTop: "10px"}}>
          <Col><CloseButton onClick={removePanel} /></Col>
        </Row>

        <Row>
          <Col>
            <Row style={{paddingTop: "10px"}}>
              <Col>
                <p>{getHexString(RGB[0], RGB[1], RGB[2])}</p>
              </Col>
              <Col>
                <Swatch colourString={formatColour("rgb", RGB)} />
              </Col>
            </Row>

            <Row>
              <Col>
                <p>HSV</p>
              </Col>
              <Col>
                <TextBox
                  colour={HSV}
                  setColour={(col) => {
                    setHSV(col);
                    setRGB(HSVtoRGB(col[0], col[1] / 100, col[2] / 100));
                  }}
                  colourType={"HSV"}
                />
              </Col>
            </Row>

            <Row>
              <Col>
                <p>RGB</p>
              </Col>
              <Col>
                <TextBox
                  colour={RGB}
                  setColour={(col) => {
                    setRGB(col);
                    setHSV(RGBtoHSV(col[0] / 255, col[1] / 255, col[2] / 255));
                  }}
                  colourType={"RGB"}
                />
              </Col>
            </Row>

            {showPicker &&
              <Row ref={canvasParent}>
                <Picker
                  onChange={(col) => {
                    setHSV(col);
                    setRGB(HSVtoRGB(col[0], col[1] / 100, col[2] / 100));
                  }}
                  id={id}
                  HSV={HSV}
                  width={pickerWidth}
                  height={pickerHeight}
                />
              </Row>
        }
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ColourPanel;
