import { Sketch, Sketches } from "../sketches/sketches";

interface SketchSelectorProps {
  colours: number[][];
  setFuncName: React.Dispatch<React.SetStateAction<string>>;
  sketches: Sketches;
}

export const SketchSelector: React.FC<SketchSelectorProps> = ({
  colours,
  setFuncName,
  sketches,
}) => {
  const usableOptions = Object.fromEntries(
    Object.entries(sketches).filter(
      ([key, _]) => parseInt(key) <= colours.length
    )
  );

  const renderOptions = (sketchList: Sketch[]) =>
    sketchList.map((sketch, idx) => <option key={idx}>{sketch.name}</option>);

  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFuncName(e.target.value);
  };

  return (
    <select onChange={onChange}>
      {Object.entries(usableOptions).map((opt, idx) => {
        const [group, sketchList] = opt;
        return (
          <optgroup key={idx} label={group}>
            {renderOptions(sketchList)}
          </optgroup>
        );
      })}
    </select>
  );
};

export default SketchSelector;
