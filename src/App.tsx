import { Row, Col, Container } from "react-bootstrap";
import { useState } from "react";
import SketchWrapper from "./components/SketchWrapper";
import PanelFactory from "./components/PanelFactory";
import sketches from "./sketches/sketches";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  const [colours, setColours] = useState([[180, 50, 50]]);
  return (
    <Container>

      <Row>
          <h1 style={{padding: "20px" }}><a href="https://art.rchu.cc">art.rchu.cc</a> - Colour picker</h1>
      </Row>

      <Row>
        <Col>
          <SketchWrapper colours={colours} sketches={sketches} />
        </Col>

        <Col>
          <PanelFactory colours={colours} setColours={setColours} />
        </Col>
      </Row>
    </Container>
  );
};

export default App;
