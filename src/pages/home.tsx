import { useEffect, useState } from "react";
import { generate_hue, generate_percentage, generate_random_colors } from "../utils";
import Column from "../components/color-column";
import { nanoid } from "nanoid";
import { Color_interface } from "../constants/interfaces";
import { HUE, LIGHT, SATURATION } from "../constants/enums";
import { Column_interface } from "../constants/interfaces";

const Home = () => {
  const [cols, setCols] = useState<Color_interface[]>([
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

  // Add a new random column
  function add_col () {
    if (cols.length >= 6) return;

    setCols([...cols, { id: nanoid(), [HUE]: generate_hue(), [SATURATION]: generate_percentage(80, 50), [LIGHT]: generate_percentage(80, 50), locked: false }]);
  };

  // Remove column
  function remove_col (id: string) {
    // Just in case..
    if (cols.length <= 1) return;

    setCols(cols.filter((el) => el.id !== id));
  };

  // Edit column state
  function handle_change(id: string, val: number, type: string) {
    const col_index = cols.findIndex((el) => el.id == id);
    let target_color = cols[col_index];
    setCols([...cols.slice(0, col_index), { ...target_color, [type]: val }, ...cols.slice(col_index + 1)]);
  }

  // Toggle lock
  function toggle_lock(id: string) {
    const col_index = cols.findIndex((el) => el.id == id);
    let target_color = cols[col_index];
    setCols([...cols.slice(0, col_index), { ...target_color, locked: !target_color.locked }, ...cols.slice(col_index + 1)]);
  }

  return (
    <div className="relative w-full min-h-screen flex items-end justify-center">
      {cols.map((el) => (
        <Column key={el.id}
          id={el.id}
          hue={el.hue}
          light={el.light} 
          locked={el.locked}
          saturation={el.saturation}
          removeCol={remove_col}
          handleChange={handle_change}
          toggleLock={toggle_lock}
          />
      ))}

    </div>
  );
};

export default Home;
