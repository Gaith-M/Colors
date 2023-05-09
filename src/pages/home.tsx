import { useEffect, useState } from "react";
import { generate_hue, generate_percentage, generate_random_colors, hexToHSL } from "../utils";
import { nanoid } from "nanoid";
import { Color_Elements, Column_basic_info, Column_interface } from "../constants/interfaces";
import { DndContext, closestCenter, PointerSensor, KeyboardSensor, useSensors, useSensor } from "@dnd-kit/core";
import { arrayMove, sortableKeyboardCoordinates, SortableContext, horizontalListSortingStrategy } from "@dnd-kit/sortable";
import { restrictToHorizontalAxis, restrictToParentElement } from "@dnd-kit/modifiers";
import ColorColumn from "../components/color-column";

const Home = () => {
  // DnD-Kit
  const sensors = useSensors(useSensor(PointerSensor), useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }));

  const [cols, setCols] = useState<Column_interface[]>([
    {
      id: nanoid(),
      hue: generate_hue(),
      saturation: generate_percentage(75, 50),
      light: generate_percentage(75, 50),
      locked: false,
    },
    {
      id: nanoid(),
      hue: generate_hue(),
      saturation: generate_percentage(75, 50),
      light: generate_percentage(75, 50),
      locked: false,
    },
    {
      id: nanoid(),
      hue: generate_hue(),
      saturation: generate_percentage(75, 50),
      light: generate_percentage(75, 50),
      locked: false,
    },
  ]);

  const [show_create_button, set_show_create_button] = useState<{ open: true; col_id: string, side: "left" | "right" } | null>(null);

  const [shades_window_state, set_shades_window_state] = useState<{ id: string | null; open: boolean; values: Color_Elements[] | null }>({
    id: null,
    open: false,
    values: null,
  });

  useEffect(() => {
    if (!window) return;
    document.addEventListener("keypress", event_handler);
    return () => document.removeEventListener("keypress", event_handler);
  }, [cols]);

  // FUNCTIONS::

  // Generate Random Colors
  function event_handler(e: KeyboardEvent) {
    if (e.code === "Space") setCols(generate_random_colors(cols));
  }

  // Drag
  function handleDragEnd(event: any) {
    const { active, over } = event;

    if (active.id !== over.id) {
      setCols((items) => {
        const oldIndex = items.findIndex((el) => el.id === active.id);
        const newIndex = items.findIndex((el) => el.id === over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }

  // Add a new column
  function add_col(caller_data: Column_basic_info, current_cols: Column_interface[], before: boolean): void | false {
    if (cols.length >= 6) return false;
    // the generated color will depend on the color adjacent to it. it will be either a tint or a shade
    let variable_value = caller_data.light;
    let caller_index = current_cols?.findIndex((el) => el.id === caller_data.id);

    if (before) variable_value = variable_value < 5 ? 0 : variable_value - 5;
    if (!before) variable_value = variable_value > 95 ? 100 : variable_value + 5;

    let new_color: Column_interface = {
      ...caller_data,
      id: nanoid(),
      locked: false,
      light: variable_value,
      currentCols: current_cols,
    };

    if (before) return setCols([...current_cols.slice(0, caller_index), new_color, cols[caller_index], ...current_cols.slice(caller_index + 1)]);
    return setCols([...current_cols.slice(0, caller_index), cols[caller_index], new_color, ...current_cols.slice(caller_index + 1)]);
  }

  // Remove column
  function remove_col(id: string) {
    // Just in case..
    if (cols.length <= 1) return;

    setCols(cols.filter((el) => el.id !== id));
  }

  // Edit Color
  function handle_change(id: string, hex: string) {
    // This function will receive the new value as HEX code
    // It will then derive HSL elements from it
    // finally it will replace the target column with the new column

    // Get the index of the column to be edited
    const col_index = cols.findIndex((el) => el.id == id);
    let target_color = cols[col_index];

    const { h, s, l } = hexToHSL(hex);
    setCols([...cols.slice(0, col_index), { ...target_color, hue: h, light: l, saturation: s }, ...cols.slice(col_index + 1)]);
  }

  // Toggle lock
  function toggle_lock(id: string, e?: any) {
    let parent: HTMLButtonElement | null = null;

    if (e?.target.tagName === "svg") parent = e?.target.parentElement;
    if (e?.target.tagName === "path") parent = e?.target.parentElement.parentElement;

    const col_index = cols.findIndex((el) => el.id == id);
    let target_color = cols[col_index];
    setCols([...cols.slice(0, col_index), { ...target_color, locked: !target_color.locked }, ...cols.slice(col_index + 1)]);

    parent?.blur();
  }

  // Shades
  function open_shades_window(id: string, { hue, saturation }: Color_Elements) {
    // Open a window inside the color
    // add an event to other columns. when any of them are clicked, close any open instances of the shade window

    // get the color values
    // create 24 shades from it
    // return them in an array
    // when any of them are clicked -> set the color of the column to this color

    // get all shades
    let light_value = 0;
    let shades = [];

    while (light_value <= 100) {
      shades.unshift({ hue, saturation, light: light_value });
      light_value += 4.5;
    }

    // set the state to the created shades and the id of the column which has the shades window open.
    // set event listeners on other columns (click) which will handle closing the shades window if one of them is clicked (beside the parent column of the window)
    set_shades_window_state({ id, open: true, values: shades });
  }

  function close_shades_window(id: string) {
    if (id !== shades_window_state.id && shades_window_state.values && shades_window_state.values.length > 0) {
      set_shades_window_state({ id: null, open: false, values: null });
    }
  }

  // Select Shade
  function select_shades(id: string, shade_value: Color_Elements) {
    // User can select the desired shade
    // it (the shade) will become the color of the column
    // Next the shades menu should close

    // The function will receive the shade as HSL
    // It will receive the column ID too
    // update state
    const col_index = cols.findIndex((el) => el.id == id);
    let target_color = cols[col_index];

    setCols([...cols.slice(0, col_index), { ...target_color, ...shade_value }, ...cols.slice(col_index + 1)]);
    // Close shades window
    set_shades_window_state({ id: null, open: false, values: null });
  }

  // Create Column Button
  // The logic is as follows:
  // create_column_button will be responsible for creating the create button. it will be triggered on mouse enter
  // destroy_column_button will remove it from dom
  // create_new_column will add a new column to the dom. the color of this column will be based on the adjacent column(s)
  function create_column_button(id: string, side: "left" | "right") {
    // The position of the button will be determined based on the location of the column within the area and the previous/next column based on side hovered
    set_show_create_button({ open: true, col_id: id, side });
  }

  function destroy_column_button() {
    set_show_create_button(null);
  }

  function get_column_pos_in_state(id: string, length: number) {
    const col_index = cols.findIndex((el) => el.id == id);

    return {
      first: col_index === 0,
      last: col_index === length,
    };
  }

  return (
    <div className="relative w-full min-h-screen flex items-end justify-center overflow-y-hidden">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
        modifiers={[restrictToHorizontalAxis, restrictToParentElement]}
      >
        <SortableContext items={cols} strategy={horizontalListSortingStrategy}>
          {cols.map((el) => (
            <ColorColumn
              key={el.id}
              data={el}
              position={get_column_pos_in_state(el.id, cols.length - 1)}
              handle_delete={remove_col}
              handle_lock={toggle_lock}
              handle_edit={handle_change}
              create_shades={open_shades_window}
              shades_window_state={shades_window_state}
              close_shades_window={close_shades_window}
              select_shades={select_shades}
              create_column_button={create_column_button}
              destroy_column_button={destroy_column_button}
              show_create_button={show_create_button}
            />
          ))}
        </SortableContext>
      </DndContext>
    </div>
  );
};

export default Home;
