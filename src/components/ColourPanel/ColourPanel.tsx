import { useRef } from "react";
import { CloseButton, Col, Container, Row } from "react-bootstrap";
import Picker from "../Picker/Picker";
import Swatch from "../Swatch";
import TextBox from "../TextBox/TextBox";
import { formatColour, getHexString, HSVtoRGB, RGBtoHSV } from "./helpers";

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
  onClick,
}) => {
  const RGB = HSVtoRGB(HSV[0], HSV[1] / 100, HSV[2] / 100);
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={containerRef} onClick={() => onClick()}>
      <Container
        fluid
        style={{
          border: "1px black solid",
          margin: "5px 0",
          borderRadius: "5px",
        }}
      >
        <Col>
          <Row style={{ paddingTop: "10px" }}>
            <Col>
              <CloseButton
                onClick={(e) => {
                  e.stopPropagation();
                  removePanel();
                }}
              />
            </Col>
          </Row>

          <Row style={{ paddingTop: "10px" }}>
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
                  setHSV(RGBtoHSV(col[0] / 255, col[1] / 255, col[2] / 255));
                }}
                colourType={"RGB"}
              />
            </Col>
          </Row>

          {showPicker && (
            <Row>
              <Picker onChange={(col) => setHSV(col)} id={id} HSV={HSV} />
            </Row>
          )}
        </Col>
      </Container>
    </div>
  );
};

export default ColourPanel;
