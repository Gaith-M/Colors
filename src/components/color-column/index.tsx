import { Column_interface } from "../../constants/interfaces";
import { HUE, LIGHT, SATURATION } from "../../constants/enums";

const Column = ({ id, hue, saturation, light, handleChange, removeCol }: Column_interface) => {
  return (
    <div
      style={{ color: `hsla(${hue}, ${saturation}%, ${light}%, 1)`, backgroundColor: "currentcolor" }}
      className="flex-1 h-[calc(100vh_-_50px)] flex flex-col items-center justify-center"
    >
      <div className="p-4 flex flex-col flex-1 min-w-full items-center justify-center bg-[#33333399]">
        <div className="w-full mb-[16px]">
          <label htmlFor={HUE} className="block capitalize font-bold mb-[6px] text-gray-300">
            {HUE}
          </label>
          <input
            style={{ accentColor: "currentcolor", appearance: "unset" }}
            className="w-full rounded-md h-[8px] mb-[8px]"
            type="range"
            name={HUE}
            value={hue}
            step={0.1}
            min={0}
            max={360}
            onChange={({ target }) => handleChange(id, +target.value, HUE)}
          />
        </div>

        <div className="w-full mb-[16px]">
          <label htmlFor={SATURATION} className="block capitalize font-bold mb-[6px] text-gray-300">
            {SATURATION}
          </label>
          <input
            style={{ accentColor: "currentcolor", appearance: "unset" }}
            className="w-full rounded-md h-[8px] mb-[8px]"
            type="range"
            name={SATURATION}
            value={saturation}
            min={0}
            max={100}
            onChange={({ target }) => handleChange(id, +target.value, SATURATION)}
          />
        </div>

        <div className="w-full mb-[16px]">
          <label htmlFor={LIGHT} className="block capitalize font-bold mb-[6px] text-gray-300">
            {LIGHT}
          </label>
          <input
            style={{ accentColor: "currentcolor", appearance: "unset" }}
            className="w-full rounded-md h-[8px] mb-[8px]"
            type="range"
            name={LIGHT}
            value={light}
            min={0}
            max={100}
            onChange={({ target }) => handleChange(id, +target.value, LIGHT)}
          />
        </div>

        <label htmlFor={id.toString()} className="w-[48px] h-[22px] bg-[#eeeeee70] rounded-[12px] px-1">
          <input onChange={e => console.log(e)} id={id.toString()} type="checkbox" className="absolute left-[999999px] top-[999999px] appearance-none peer"/>
          <span className="translate-y-[3px] w-[16px] h-[16px] block bg-white rounded-full
          transition-all duration-200
          peer-checked:translate-x-[24px]
          peer-checked:bg-[currentColor]"/>
        </label>

        <button onClick={() => removeCol(id)}>Delete</button>
      </div>
    </div>
  );
};

export default Column;
