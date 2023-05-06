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

// ------------------------------
export interface Color_Interface {
  id: string;
  hue: number;
  saturation: number;
  light: number;
  locked: boolean;
}

export interface Color_Column_Props {
  data: Color_Interface;
  handle_edit: (id: string, hex: string) => void;
  handle_delete: (id: string) => void;
  handle_lock: (id: string) => void;
  render_shades: (id: string, values: Color_Elements) => void;
}

export interface Color_Elements {
  hue: number;
  light: number;
  saturation: number;
}

// ------------------------------