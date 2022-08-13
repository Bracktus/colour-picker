import CanvasWrapper from "./components/CanvasWrapper";
import PanelFactory from "./components/PanelFactory";
import { Row, Col, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";

const App = () => {
  const [colours, setColours] = useState([[180, 50, 50]]);
  return (
    <Container>
      <Row>
        <Col>
          <h1>Hello World!</h1>
          <CanvasWrapper />
        </Col>
        <Col>
          <PanelFactory colours={colours} setColours={setColours} />
        </Col>
      </Row>
    </Container>
  );
};

export default App;
