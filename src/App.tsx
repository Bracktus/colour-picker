import CanvasWrapper from "./components/CanvasWrapper";
import { ColourPanel } from "./components/ColourPanel/ColourPanel";
import "./css/App.css";

// interface colours {
//     [key: number]: string
// }

const App = () => {
    //const [colours, setColours] = useState<colours>({});
    return (
        <>
            <h1>Hello World!</h1>
            <div style={{alignItems: "center", display: "flex"}}>
            <CanvasWrapper/>
            <ColourPanel id={1}/>
            </div>
        </>
    );
};

export default App;