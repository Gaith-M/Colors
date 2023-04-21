import { useState } from "react";
import { construct_random_color } from "../utils";

const Home = () => {
    const [color, setColor] = useState('hsl(10, 50%, 50%)')

  const generate_color = () => {
    let [h, s, l] = construct_random_color();
    let color = `hsl(${h}, ${s}%, ${l}%)`;
    setColor(color);
  };


  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center">
      <div className="min-w-[300px] min-h-[300px]" style={{backgroundColor: color}}></div>
      <button onClick={generate_color}>Generate</button>
    </div>
  );
};

export default Home;
