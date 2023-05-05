export interface Column_interface {
  id: string;
  locked: boolean;
  hue: number;
  light: number;
  saturation: number;
  removeCol?: (id: string) => void;
  toggleLock?: (id: string, e?: MouseEvent) => void;
  handleChange?: (id: string, hex: string) => void;
  addColumn?: (caller_data: Column_basic_info, cols: Column_interface[], before: boolean) => void | false;
  currentCols?: Column_interface[];
}

export interface Column_basic_info {
  id: string;
  hue: number;
  light: number;
  saturation: number;
}
