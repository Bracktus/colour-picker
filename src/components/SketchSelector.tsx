import { Sketch, Sketches } from "../sketches/sketches";

interface SketchSelectorProps {
  colours: number[][];
  setFuncName: React.Dispatch<
    React.SetStateAction<{
      key: string;
      name: string;
    }>
  >;
  funcName: { key: string; name: string };
  sketches: Sketches;
}

export const SketchSelector: React.FC<SketchSelectorProps> = ({
  colours,
  setFuncName,
  sketches,
  funcName,
}) => {
  const usableOptions = Object.fromEntries(
    Object.entries(sketches).filter(([key, _]) => {
      if (key.match(/[0-9]+$/)) {
        return parseInt(key) <= colours.length;
      }
      return true;
    })
  );

  const renderOptions = (sketchList: Sketch[], groupId: string) =>
    sketchList.map((sketch, idx) => (
      <option value={`${groupId}-${sketch.name}`} key={idx}>
        {sketch.name}
      </option>
    ));

  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const re = /(.+)-(.+)/i;
    const match = e.target.value.match(re);
    if (match == null) throw Error("Invalid sketch name");
    else {
      const [, funcKey, funcName] = match;
      setFuncName({ key: funcKey, name: funcName });
    }
  };

  return (
    <select value={`${funcName.key}-${funcName.name}`} onChange={onChange}>
      {Object.entries(usableOptions).map((opt, idx) => {
        const [group, sketchList] = opt;
        return (
          <optgroup key={idx} label={group}>
            {renderOptions(sketchList, group)}
          </optgroup>
        );
      })}
    </select>
  );
};

export default SketchSelector;
