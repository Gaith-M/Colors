export interface Column_interface {
  id: string;
  hue: number;
  saturation: number;
  light: number;
  handleChange?: (id: string, val: number, name: string) => void;
  removeCol?: (id: string) => void;
  toggleLock?: (id: string, e?: MouseEvent) => void;
  locked: boolean;
}


