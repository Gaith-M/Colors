import { ChangeEvent, ChangeEventHandler, useState } from "react";
import { determine_dark_or_light, hexToHSL } from "../../utils";

const ColorPicker = ({ color_values: { HEX, HSL, RGB }, id, edit_values }: InputColorPropsInterface) => {
  const { h, s, l } = hexToHSL(HEX);

  return (
    <label htmlFor={id + "-picker"} className="relative flex items-center justify-center">
      <span className="uppercase text-center text-[24px] font-bold mt-[24px]" style={{ color: determine_dark_or_light(l) }}>{HEX}</span>
      <input
        type="color"
        id={id + "-picker"}
        value={HEX}
        onChange={(e: ChangeEvent<HTMLInputElement>) => edit_values(id, e.target.value)}
        className="w-0 h-0 opacity-0 absolute"
      />
    </label>
  );
};

export default ColorPicker;

export interface InputColorPropsInterface {
  color_values: { HEX: string; RGB: string; HSL: string };
  id: string;
  edit_values: (hex: string, id: string) => void;
}
