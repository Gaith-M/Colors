import { ChangeEvent } from "react";
import { determine_dark_or_light, hsl_to_hex } from "../../utils";

const ColorPicker = ({ color_values: { hue, saturation, light }, id, handle_edit }: InputColorPropsInterface) => {
  const HEX = hsl_to_hex(hue, saturation, light);

  return (
    <label htmlFor={id + "-picker"} className="py-[6px] relative flex items-center justify-center transition-colors duration-200">
      <span className="uppercase text-center text-[24px] font-bold mt-[24px] text-inherit">
        {HEX}
      </span>
      <input
        type="color"
        id={id + "-picker"}
        value={HEX}
        onChange={(e: ChangeEvent<HTMLInputElement>) => handle_edit(id, e.target.value)}
        className="w-0 h-0 opacity-0 absolute"
      />
    </label>
  );
};

export default ColorPicker;

export interface InputColorPropsInterface {
  color_values: { hue: number; saturation: number; light: number };
  id: string;
  handle_edit: (hex: string, id: string) => void;
}
