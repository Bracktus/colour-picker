import CanvasWrapper from "./components/CanvasWrapper";
import PanelFactory from "./components/PanelFactory";
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Row } from "react-bootstrap";

// interface colours {
//     [key: number]: string
// }

const App = () => {
  //const [colours, setColours] = useState<colours>({});
  return (
    <Container>
      <Row>
        <Col>
          <h1>Hello World!</h1>
          <CanvasWrapper />
        </Col>
        <Col>
          <PanelFactory />
        </Col>
      </Row>
    </Container>
  );
};

export default App;
