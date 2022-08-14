import { Row, Col, Container } from "react-bootstrap";
import { useState } from "react";
import CanvasWrapper from "./components/CanvasWrapper";
import PanelFactory from "./components/PanelFactory";
import sketches from "./sketches/sketches";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  const [colours, setColours] = useState([[180, 50, 50]]);
  return (
    <Container>

      <Row>
          <h1>Hello World!</h1>
      </Row>

      <Row>

        <Col>
          <CanvasWrapper colours={colours} sketches={sketches} />
        </Col>

        <Col>
          <PanelFactory colours={colours} setColours={setColours} />
        </Col>

      </Row>
    </Container>
  );
};

export default App;
