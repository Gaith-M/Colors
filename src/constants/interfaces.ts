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
  position: { first: boolean; last: boolean };
  handle_edit: (id: string, hex: string) => void;
  handle_delete: (id: string) => void;
  handle_lock: (id: string) => void;
  create_shades: (id: string, values: Color_Elements) => void;
  shades_window_state: { id: string | null; open: boolean; values: Color_Elements[] | null };
  close_shades_window: (id: string) => void;
  select_shades: (id: string, shade_values: Color_Elements) => void;
  create_column_button: (id: string, side: "left" | "right") => void;
  destroy_column_button: () => void;
  show_create_button: { open: true; col_id: string; side: "left" | "right" } | null;
}

export interface Color_Elements {
  hue: number;
  light: number;
  saturation: number;
}

// ------------------------------
