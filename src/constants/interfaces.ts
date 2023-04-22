export interface Column_interface {
  id: string;
  hue: number;
  saturation: number;
  light: number;
  handleChange: (id: string, val: number, name: string) => void;
  removeCol: (id: string) => void;
}

export interface Color_interface {
  id: string;
  locked: boolean;
  hue: number;
  light: number;
  saturation: number;
}
