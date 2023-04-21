import { useState } from "react";
import { construct_random_color, generate_hue, generate_percentage } from "../utils";
import Column from "../components/color-column";
import { nanoid } from "nanoid";
import { Color_interface } from "../constants/interfaces";
import { HUE, LIGHT, SATURATION } from "../constants/enums";

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

  // Add a new random color
  const add_col = () => {
    if (cols.length >= 6) return;

    setCols([...cols, { id: nanoid(), [HUE]: generate_hue(), [SATURATION]: generate_percentage(80, 50), [LIGHT]: generate_percentage(80, 50), locked: false }]);
  };

  const remove_col = (id: string) => {
    // Just in case..
    if (cols.length <= 1) return;

    setCols(cols.filter((el) => el.id !== id));
  };

  const handle_change = (id: string, val: number, type: string) => {
    const col_index = cols.findIndex((el) => el.id == id);
    let target_color = cols[col_index];
    setCols([...cols.slice(0, col_index), { ...target_color, [type]: val }, ...cols.slice(col_index + 1)]);
  };

  return (
    <div className="relative w-full min-h-screen flex items-end justify-center">
      {cols.map((el) => (
        <Column key={el.id} id={el.id} removeCol={remove_col} handleChange={handle_change} hue={el.HUE} saturation={el.SATURATION} light={el.LIGHT} />
      ))}

      <div className="absolute">
        <button onClick={add_col}>Add Row</button>
      </div>
    </div>
  );
};

export default Home;
