import { Column_interface } from "../../constants/interfaces";
import { HUE, LIGHT, SATURATION } from "../../constants/enums";

const Column = ({ id, hue, saturation, light, handleChange, removeCol }: Column_interface) => {
  console.log(light);
  return (
    <div
      style={{ backgroundColor: `hsla(${hue}, ${saturation}%, ${light}%, 1)` }}
      className="flex-1 h-[calc(100vh_-_50px)] flex flex-col items-center justify-center"
    >
      <input type="range" name={HUE} value={hue} min={0} max={360} onChange={({ target }) => handleChange(id, +target.value, HUE)} />
      <input type="range" name={SATURATION} value={saturation} min={0} max={100} onChange={({ target }) => handleChange(id, +target.value, SATURATION)} />
      <input type="range" name={LIGHT} value={light} min={0} max={100} onChange={({ target }) => handleChange(id, +target.value, LIGHT)} />

      <label htmlFor={id.toString()}>
        <input type="radio" />
      </label>
      <button onClick={() => removeCol(id)}>Delete</button>
    </div>
  );
};

export default Column;
