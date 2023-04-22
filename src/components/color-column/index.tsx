import { motion } from "framer-motion";
import { Column_interface } from "../../constants/interfaces";
import { HUE, LIGHT, SATURATION } from "../../constants/enums";

const submenu_motion = {
  rest: { opacity: 0, duration: 0.3, y: 100 , type: "tween" },
  hover: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      type: "tween",
    },
  },
};

const Column = ({ id, hue, saturation, light, handleChange, removeCol, locked, toggleLock }: Column_interface) => {
  return (
    <motion.div
      whileHover="hover"
      initial="rest"
      animate="rest"
      style={{ color: `hsla(${hue}, ${saturation}%, ${light}%, 1)`, backgroundColor: "currentcolor" }}
      className="flex-1 h-[calc(100vh_-_50px)] flex flex-col items-center justify-center"
    >
      <motion.div variants={submenu_motion} 
        className="p-4 flex flex-col flex-1 min-w-full items-center justify-center 
        overflow-y-hidden relative bg-[#33333311]
        h-full max-h-[calc(100vh_-_50px)] overscroll-y-none">
        <button tabIndex={-999} className="absolute right-6 top-4 outline-none" onClick={() => toggleLock(id)}>
          <svg
            className={`${locked ? "fill-[#54e354de]" : "fill-[#fff9]"} transition-all duration-300`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 50 50"
            width="30"
            height="30"
          >
            <path d="M 25 3 C 18.363281 3 13 8.363281 13 15 L 13 20 L 9 20 C 7.355469 20 6 21.355469 6 23 L 6 47 C 6 48.644531 7.355469 50 9 50 L 41 50 C 42.644531 50 44 48.644531 44 47 L 44 23 C 44 21.355469 42.644531 20 41 20 L 37 20 L 37 15 C 37 8.363281 31.636719 3 25 3 Z M 25 5 C 30.566406 5 35 9.433594 35 15 L 35 20 L 15 20 L 15 15 C 15 9.433594 19.433594 5 25 5 Z M 9 22 L 41 22 C 41.554688 22 42 22.445313 42 23 L 42 47 C 42 47.554688 41.554688 48 41 48 L 9 48 C 8.445313 48 8 47.554688 8 47 L 8 23 C 8 22.445313 8.445313 22 9 22 Z M 25 30 C 23.300781 30 22 31.300781 22 33 C 22 33.898438 22.398438 34.6875 23 35.1875 L 23 38 C 23 39.101563 23.898438 40 25 40 C 26.101563 40 27 39.101563 27 38 L 27 35.1875 C 27.601563 34.6875 28 33.898438 28 33 C 28 31.300781 26.699219 30 25 30 Z" />
          </svg>
        </button>

        {/* Delete Button */}
        {!locked && (
          <button tabIndex={-999} className="absolute right-1 top-16 translate-x-[-1px] group" onClick={() => removeCol(id)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 50 50"
              width="50"
              height="50"
              className="fill-[#fff9] transition-all duration-300 group-hover:fill-rose-400"
            >
              <path
                strokeWidth="0.5px"
                d="M 15 4 C 14.476563 4 13.941406 4.183594 13.5625 4.5625 C 13.183594 4.941406 13 5.476563 13 6 L 13 7 L 7 7 L 7 9 L 8 9 L 8 25 C 8 26.644531 9.355469 28 11 28 L 23 28 C 24.644531 28 26 26.644531 26 25 L 26 9 L 27 9 L 27 7 L 21 7 L 21 6 C 21 5.476563 20.816406 4.941406 20.4375 4.5625 C 20.058594 4.183594 19.523438 4 19 4 Z M 15 6 L 19 6 L 19 7 L 15 7 Z M 10 9 L 24 9 L 24 25 C 24 25.554688 23.554688 26 23 26 L 11 26 C 10.445313 26 10 25.554688 10 25 Z M 12 12 L 12 23 L 14 23 L 14 12 Z M 16 12 L 16 23 L 18 23 L 18 12 Z M 20 12 L 20 23 L 22 23 L 22 12 Z"
              />
            </svg>
          </button>
        )}

        <div className="w-full mb-[16px]">
          <label htmlFor={HUE} className={`block capitalize font-bold mb-[6px] transition-colors duration-100 ${light > 50? 'text-gray-800' : 'text-gray-100'}`}>
            {HUE}
          </label>
          <input
            style={{ accentColor: "currentcolor", appearance: "unset" }}
            className="w-full rounded-md h-[16px] mb-[8px]"
            type="range"
            name={HUE}
            value={hue}
            step={0.1}
            min={0}
            max={360}
            onChange={({ target }) => handleChange(id, +target.value, HUE)}
          />
        </div>

        <div className="w-full mb-[16px]">
          <label htmlFor={SATURATION} className={`block capitalize font-bold mb-[6px] transition-colors duration-100 ${light > 50? 'text-gray-800' : 'text-gray-100'}`}>
            {SATURATION}
          </label>
          <input
            style={{ accentColor: "currentcolor", appearance: "unset" }}
            className="w-full rounded-md h-[16px] mb-[8px]"
            type="range"
            name={SATURATION}
            value={saturation}
            min={0}
            max={100}
            onChange={({ target }) => handleChange(id, +target.value, SATURATION)}
          />
        </div>

        <div className="w-full mb-[16px]">
          <label htmlFor={LIGHT} className={`block capitalize font-bold mb-[6px] transition-colors duration-100 ${light > 50? 'text-gray-800' : 'text-gray-100'}`}>
            {LIGHT}
          </label>
          <input
            style={{ accentColor: "currentcolor", appearance: "unset" }}
            className="w-full rounded-md h-[16px] mb-[8px]"
            type="range"
            name={LIGHT}
            value={light}
            min={0}
            max={100}
            onChange={({ target }) => handleChange(id, +target.value, LIGHT)}
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Column;
