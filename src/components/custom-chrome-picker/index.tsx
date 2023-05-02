import { CustomPicker } from "react-color";
import { Hue, Saturation } from "react-color/lib/components/common";

const CustomChromePicker = ({ color, onChange }: any) => {
  const handleChange = (updatedColor: CustomChromePickerInterface) => {
    onChange(updatedColor);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {/* <Saturation color={color} onChange={handleChange} />
      <Hue color={color} onChange={handleChange} /> */}
    </div>
  );
};

export default CustomPicker(CustomChromePicker);

interface CustomChromePickerInterface {
  color: {
    h: number;
    s: number;
    l: number;
    a: number;
  };
  hsl: {
    h: number;
    s: number;
    l: number;
    a: number;
  };
  hex: string;
  rgb: {
    r: number;
    g: number;
    b: number;
    a: number;
  };
  hsv: {
    h: number;
    s: number;
    v: number;
    a: number;
  };
  oldHue: number;
  onChange: (color: CustomChromePickerInterface) => void;
}
