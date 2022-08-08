import CanvasWrapper from "./components/CanvasWrapper";
import { ColourPanel } from "./components/ColourPanel/ColourPanel";
import PanelFactory from "./components/PanelFactory";
import "./css/layout.css";

// interface colours {
//     [key: number]: string
// }

const App = () => {
  //const [colours, setColours] = useState<colours>({});
  return (
    <div className="row">
      <div className="column">
        <h1>Hello World!</h1>
        <CanvasWrapper />
      </div>
      <div className="column">
        <PanelFactory />
      </div>
    </div>
  );
};

export default App;
