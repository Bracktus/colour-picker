import CanvasWrapper from "./components/CanvasWrapper";
import { ColourPanel } from "./components/ColourPanel/ColourPanel";
import "./css/App.css";

const App = () => {
    return (
        <>
            <h1>Hello World!</h1>
            <div style={{alignItems: "center", display: "flex"}}>
            <CanvasWrapper/>
            <ColourPanel/>
            </div>
        </>
    );
};

export default App;
