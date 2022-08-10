import { useRef, useState } from "react";
import { CloseButton, Col, Collapse, Container, ListGroup, Row } from "react-bootstrap";
import Picker from "../Picker/Picker";
import Swatch from "../Swatch";
import TextBox from "../TextBox/TextBox";
import {
  formatColour,
  getHexString,
  HSVtoRGB,
  RGBtoHSV,
  useOutsideAlerter,
} from "./helpers";

interface ColourPanelProps {
  id: number;
  HSV: number[];
  setHSV: (HSV: number[]) => void;
  removePanel: () => void;
  canRemove: boolean
}

export const ColourPanel: React.FC<ColourPanelProps> = ({
  id,
  HSV,
  setHSV,
  removePanel,
  canRemove
}) => {
  const [RGB, setRGB] = useState(HSVtoRGB(HSV[0], HSV[1] / 100, HSV[2] / 100));
  const [showPicker, setShowPicker] = useState(true);

  //If we click outside of the div, hide the picker
  const containerRef = useRef<HTMLDivElement>(null);
  useOutsideAlerter(containerRef, () => setShowPicker(false));

  return (
    <div
      ref={containerRef}
      onClick={() => setShowPicker(true)}
    >
      <Container fluid style={{border: "1px black solid", margin: "5px 0", borderRadius: "5px"}}>
        {canRemove &&
          <Row style={{paddingTop: "10px"}}>
            <Col><CloseButton onClick={removePanel} /></Col>
          </Row>
        }

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
          </Col>
          
          <Collapse in={showPicker}>
            <Col>
              <Row>
                <Picker
                  onChange={(col) => {
                    setHSV(col);
                    setRGB(HSVtoRGB(col[0], col[1] / 100, col[2] / 100));
                  }}
                  id={id}
                  HSV={HSV}
                />
              </Row>
            </Col>
          </Collapse>
        </Row>

      </Container>
    </div>
  );
};

export default ColourPanel;
