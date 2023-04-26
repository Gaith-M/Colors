import { Column_interface } from "../constants/interfaces";
import chroma from 'chroma-js';


export function generate_hue(): number {
  return Math.floor(Math.random() * 361);
}

// I updated the function to receive min and max value in order to control the intensity of the colors because lighter colors are more inviting and easier on the eyes.
export function generate_percentage(min: number, max: number): number {
  let random_number = Math.random() * (max - min) + min;

  if (random_number < 0.1) return 0.0;

  if (random_number > 99.9) return 100.0;

  return +random_number.toFixed(2);
}

// Currently not being used.
export function construct_random_color(min: number, max: number): number[] {
  const hue = generate_hue();
  const light = generate_percentage(min, max);
  const saturation = generate_percentage(min, max);

  return [hue, saturation, light];
}

export let generate_random_colors = (cols: Column_interface[]): Column_interface[] => {
  return cols.map((el) => {
    if (el.locked) {
      return el;
    }
    return {
      ...el,
      hue: generate_hue(),
      saturation: generate_percentage(35, 80),
      light: generate_percentage(35, 80),
    };
  });
};


export function determine_dark_or_light(light_value: number) {
  return light_value > 50? '#333' : '#fff'
}


export function hsl_to_rgb(h: number, s: number, l:number): {r: number, g:number, b: number} {
  // Convert hue to range [0, 360]
  h = h % 360;
  if (h < 0) {
    h += 360;
  }

  // Convert saturation and lightness to range [0, 1]
  s = Math.max(0, Math.min(1, s / 100));
  l = Math.max(0, Math.min(1, l / 100));

  // If saturation is 0, the color is a shade of gray
  if (s === 0) {
    const gray = Math.round(l * 255);
    return { r: gray, g: gray, b: gray };
  }

  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;

  let r, g, b;
  if (h < 60) {
    r = c;
    g = x;
    b = 0;
  } else if (h < 120) {
    r = x;
    g = c;
    b = 0;
  } else if (h < 180) {
    r = 0;
    g = c;
    b = x;
  } else if (h < 240) {
    r = 0;
    g = x;
    b = c;
  } else if (h < 300) {
    r = x;
    g = 0;
    b = c;
  } else {
    r = c;
    g = 0;
    b = x;
  }

  r = Math.round((r + m) * 255);
  g = Math.round((g + m) * 255);
  b = Math.round((b + m) * 255);

  return { r, g, b };
}

export function rgb_to_hex(r:number, g:number, b: number): string {
  const red = r.toString(16).padStart(2, "0");
  const green = g.toString(16).padStart(2, "0");
  const blue = b.toString(16).padStart(2, "0");
  console.log(chroma('#fff').name())

  return `#${red}${green}${blue}`
}
