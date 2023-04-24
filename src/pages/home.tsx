import { useEffect, useState } from "react";
import { generate_hue, generate_percentage, generate_random_colors } from "../utils";
import Column from "../components/color-column";
import { nanoid } from "nanoid";
import { Column_basic_info, Column_interface } from "../constants/interfaces";
import { HUE, LIGHT, SATURATION } from "../constants/enums";

const Home = () => {
  const [cols, setCols] = useState<Column_interface[]>([
    {
      id: nanoid(),
      [HUE]: generate_hue(),
      [SATURATION]: generate_percentage(75, 50),
      [LIGHT]: generate_percentage(75, 50),
      locked: false,
    },
    {
      id: nanoid(),
      [HUE]: generate_hue(),
      [SATURATION]: generate_percentage(75, 50),
      [LIGHT]: generate_percentage(75, 50),
      locked: false,
    },
    {
      id: nanoid(),
      [HUE]: generate_hue(),
      [SATURATION]: generate_percentage(75, 50),
      [LIGHT]: generate_percentage(75, 50),
      locked: false,
    },
  ]);

  function event_handler(e: KeyboardEvent) {
    if (e.code === "Space") setCols(generate_random_colors(cols));
  }

  useEffect(() => {
    if (!window) return;
    document.addEventListener("keypress", event_handler);
    return () => document.removeEventListener("keypress", event_handler);
  }, [cols]);

  // Add a new column
  function add_col(caller_data: Column_basic_info, current_cols: Column_interface[]): void | false {
    if (cols.length >= 6) return false;
    // the generated color will depend on the color adjacent to it. it will be either a tent or a slight different in hue

    // generate new color:
    // first check the degree of light. if over 100%, increment hue by x
    let variable_name: "light" | "hue" = caller_data.light > 95 ? "hue" : "light";
    let variable_value = caller_data.light > 95 ? caller_data.hue : caller_data.light;
    let color_data: { name?: string; value?: number; maxed: boolean } = { maxed: false };
    let caller_index = current_cols?.findIndex((el) => el.id === caller_data.id);

    variable_value += 5;

    if (variable_name === "hue" && variable_value >= 360) color_data = { maxed: true };

    let new_color: Column_interface = {
      ...caller_data,
      id: nanoid(),
      locked: false,
      saturation: caller_data.saturation,
      currentCols: current_cols
    };

    if (color_data.maxed) {
      new_color.hue = 0;
      new_color.light = 50;

      setCols([...current_cols.slice(0, caller_index), new_color, ...current_cols.slice(caller_index)]);
    }

    variable_name && (new_color[variable_name] = variable_value);

    setCols([...current_cols.slice(0, caller_index), new_color, ...current_cols.slice(caller_index)]);
  }

  // Remove column
  function remove_col(id: string) {
    // Just in case..
    if (cols.length <= 1) return;

    setCols(cols.filter((el) => el.id !== id));
  }

  // Edit column state
  function handle_change(id: string, val: number, type: string) {
    const col_index = cols.findIndex((el) => el.id == id);
    let target_color = cols[col_index];
    setCols([...cols.slice(0, col_index), { ...target_color, [type]: val }, ...cols.slice(col_index + 1)]);
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

  return (
    <div className="relative w-full min-h-screen flex items-end justify-center overflow-y-hidden">
      {cols.map((el) => (
        <Column
          key={el.id}
          id={el.id}
          hue={el.hue}
          light={el.light}
          locked={el.locked}
          saturation={el.saturation}
          removeCol={remove_col}
          toggleLock={toggle_lock}
          handleChange={handle_change}
          addColumn={add_col}
          currentCols={cols}
        />
      ))}
    </div>
  );
};

export default Home;
