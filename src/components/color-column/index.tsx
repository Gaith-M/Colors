import { motion } from "framer-motion";
import { Column_interface } from "../../constants/interfaces";
import { HUE, LIGHT, SATURATION } from "../../constants/enums";
import { determine_dark_or_light, hsl_to_rgb, rgb_to_hex } from "../../utils";
import { ChangeEvent, useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {ChromePicker} from 'react-color';
import CustomChromePicker from "../custom-chrome-picker";

const submenu_motion = {
  rest: { opacity: 0, duration: 0.3, y: 100, type: "tween" },
  hover: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      type: "tween",
    },
  },
};

const Column = ({ id, hue, saturation, light, handleChange, removeCol, locked, toggleLock, addColumn, currentCols }: Column_interface) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const [showToast, setShowToast] = useState(false);
  const [colorValueType, setColorValueType] = useState<"HEX" | "RGB" | "HSL">("HEX");

  const { r, g, b } = hsl_to_rgb(hue, saturation, light);

  const color_values = {
    HEX: rgb_to_hex(r, g, b),
    HSL: `hsl(${hue}, ${saturation}%, ${light}%)`,
    RGB: `rgb(${r}, ${g}, ${b})`,
  };

  const copy_to_clipboard = (text: string) => {
    navigator.clipboard
      .writeText(text)
      .then(
        () => {
          setShowToast(true);
          setTimeout(() => setShowToast(false), 2000);
        },
        (err) => console.log("failed", err)
      )
      .catch((err) => console.log(err));
  };

  const handle_change = ({ target }: ChangeEvent<HTMLInputElement>) => {
    if (target.value === "HEX") setColorValueType("HEX");
    if (target.value === "RGB") setColorValueType("RGB");
    if (target.value === "HSL") setColorValueType("HSL");
  };

  return (
    <motion.div
      ref={setNodeRef}
      whileHover="hover"
      initial="rest"
      animate="rest"
      transition={{ ease: "easeInOut", type: "tween" }}
      style={{ color: `hsla(${hue}, ${saturation}%, ${light}%, 1)`, backgroundColor: "currentcolor", ...style }}
      className="flex-1 h-[calc(100vh_-_50px)] flex flex-col items-center justify-center"
    >
      <motion.div
        variants={submenu_motion}
        className="p-4 flex flex-col flex-1 min-w-full items-center justify-center 
        overflow-y-hidden relative bg-[#33333311]
        h-full max-h-[calc(100vh_-_50px)] overscroll-y-none
        capitalize font-bold"
      >
        <button tabIndex={-999} className="absolute right-6 top-4 outline-none" onClick={(event: any) => toggleLock && toggleLock(id, event)}>
          <svg
            style={{ fill: determine_dark_or_light(light) }}
            className="transition-all duration-300"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 50 50"
            width="30"
            height="30"
          >
            {locked ? (
              <path d="M 25 3 C 18.363281 3 13 8.363281 13 15 L 13 20 L 9 20 C 7.355469 20 6 21.355469 6 23 L 6 47 C 6 48.644531 7.355469 50 9 50 L 41 50 C 42.644531 50 44 48.644531 44 47 L 44 23 C 44 21.355469 42.644531 20 41 20 L 37 20 L 37 15 C 37 8.363281 31.636719 3 25 3 Z M 25 5 C 30.566406 5 35 9.433594 35 15 L 35 20 L 15 20 L 15 15 C 15 9.433594 19.433594 5 25 5 Z M 9 22 L 41 22 C 41.554688 22 42 22.445313 42 23 L 42 47 C 42 47.554688 41.554688 48 41 48 L 9 48 C 8.445313 48 8 47.554688 8 47 L 8 23 C 8 22.445313 8.445313 22 9 22 Z M 25 30 C 23.300781 30 22 31.300781 22 33 C 22 33.898438 22.398438 34.6875 23 35.1875 L 23 38 C 23 39.101563 23.898438 40 25 40 C 26.101563 40 27 39.101563 27 38 L 27 35.1875 C 27.601563 34.6875 28 33.898438 28 33 C 28 31.300781 26.699219 30 25 30 Z" />
            ) : (
              <path d="M 22.78125 0 C 21.605469 -0.00390625 20.40625 0.164063 19.21875 0.53125 C 12.902344 2.492188 9.289063 9.269531 11.25 15.59375 L 11.25 15.65625 C 11.507813 16.367188 12.199219 18.617188 12.625 20 L 9 20 C 7.300781 20 6 21.300781 6 23 L 6 47 C 6 48.699219 7.300781 50 9 50 L 41 50 C 42.699219 50 44 48.699219 44 47 L 44 23 C 44 21.300781 42.699219 20 41 20 L 14.75 20 C 14.441406 19.007813 13.511719 16.074219 13.125 15 L 13.15625 15 C 11.519531 9.722656 14.5 4.109375 19.78125 2.46875 C 25.050781 0.832031 30.695313 3.796875 32.34375 9.0625 C 32.34375 9.066406 32.34375 9.089844 32.34375 9.09375 C 32.570313 9.886719 33.65625 13.40625 33.65625 13.40625 C 33.746094 13.765625 34.027344 14.050781 34.386719 14.136719 C 34.75 14.226563 35.128906 14.109375 35.375 13.832031 C 35.621094 13.550781 35.695313 13.160156 35.5625 12.8125 C 35.5625 12.8125 34.433594 9.171875 34.25 8.53125 L 34.25 8.5 C 32.78125 3.761719 28.601563 0.542969 23.9375 0.0625 C 23.550781 0.0234375 23.171875 0 22.78125 0 Z M 25 30 C 26.699219 30 28 31.300781 28 33 C 28 33.898438 27.601563 34.6875 27 35.1875 L 27 38 C 27 39.101563 26.101563 40 25 40 C 23.898438 40 23 39.101563 23 38 L 23 35.1875 C 22.398438 34.6875 22 33.898438 22 33 C 22 31.300781 23.300781 30 25 30 Z" />
            )}
          </svg>
        </button>

        {/* Delete Button */}
        {!locked && (
          <button tabIndex={-999} className="absolute right-1 top-16 translate-x-[-1px] group" onClick={() => removeCol && removeCol(id)}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" width="50" height="50" style={{ fill: determine_dark_or_light(light) }}>
              <path
                strokeWidth="0.5px"
                d="M 15 4 C 14.476563 4 13.941406 4.183594 13.5625 4.5625 C 13.183594 4.941406 13 5.476563 13 6 L 13 7 L 7 7 L 7 9 L 8 9 L 8 25 C 8 26.644531 9.355469 28 11 28 L 23 28 C 24.644531 28 26 26.644531 26 25 L 26 9 L 27 9 L 27 7 L 21 7 L 21 6 C 21 5.476563 20.816406 4.941406 20.4375 4.5625 C 20.058594 4.183594 19.523438 4 19 4 Z M 15 6 L 19 6 L 19 7 L 15 7 Z M 10 9 L 24 9 L 24 25 C 24 25.554688 23.554688 26 23 26 L 11 26 C 10.445313 26 10 25.554688 10 25 Z M 12 12 L 12 23 L 14 23 L 14 12 Z M 16 12 L 16 23 L 18 23 L 18 12 Z M 20 12 L 20 23 L 22 23 L 22 12 Z"
              />
            </svg>
          </button>
        )}

        <div className="w-full mb-[16px]">
          <label htmlFor={HUE} className={`block mb-[6px] transition-colors duration-100 ${light > 50 ? "text-gray-800" : "text-gray-100"}`}>
            {HUE}
          </label>
          <input
            style={{ accentColor: "#333", appearance: "unset" }}
            className="w-full rounded-md h-[16px] mb-[8px]"
            type="range"
            name={HUE}
            value={hue}
            step={0.1}
            min={0}
            max={360}
            onChange={({ target }) => handleChange && handleChange(id, +target.value, HUE)}
          />
        </div>

        <div className="w-full mb-[16px]">
          <label htmlFor={SATURATION} className={`block mb-[6px] transition-colors duration-100 ${light > 50 ? "text-gray-800" : "text-gray-100"}`}>
            {SATURATION}
          </label>
          <input
            style={{ accentColor: "#333", appearance: "unset" }}
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
          <label htmlFor={LIGHT} className={`block mb-[6px] transition-colors duration-100 ${light > 50 ? "text-gray-800" : "text-gray-100"}`}>
            {LIGHT}
          </label>
          <input
            style={{ accentColor: "#333", appearance: "unset" }}
            className="w-full rounded-md h-[16px] mb-[8px]"
            type="range"
            name={LIGHT}
            value={light}
            min={0}
            max={100}
            onChange={({ target }) => handleChange(id, +target.value, LIGHT)}
          />
        </div>

        <div>
          {/* START::Drag Handler */}
          <button
            {...attributes}
            {...listeners}
            className={`p-[6px] cursor-move rounded-md transition-colors duration-200 ${light > 60 ? "hover:bg-[#55555533]" : "hover:bg-[#eeeeee33]"}`}
          >
            <svg
              style={{ fill: determine_dark_or_light(light), stroke: determine_dark_or_light(light) }}
              version="1.1"
              id="Capa_1"
              xmlns="http://www.w3.org/2000/svg"
              width="35px"
              height="35px"
              viewBox="-35.87 -35.87 430.41 430.41"
              strokeWidth="0.0035866599999999998"
              transform="rotate(90)matrix(1, 0, 0, 1, 0, 0)"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" stroke="#CCCCCC" strokeWidth="4.303991999999999"></g>
              <g id="SVGRepo_iconCarrier">
                {" "}
                <g>
                  {" "}
                  <g>
                    {" "}
                    <polygon points="190.367,316.44 190.367,42.226 236.352,88.225 251.958,72.619 179.333,0 106.714,72.613 122.291,88.231 168.302,42.226 168.302,316.44 122.314,270.443 106.708,286.044 179.333,358.666 251.958,286.056 236.363,270.432 "></polygon>{" "}
                  </g>{" "}
                </g>{" "}
              </g>
            </svg>
          </button>
          {/* END::Drag Handler */}
        </div>

        <div className={`mt-[24px] min-w-full ${light > 50 ? "text-gray-800" : "text-gray-100"}`}>
          <div className="flex flex-col items-center justify-between gap-[24px]">
            <button
              onClick={addColumn && (() => addColumn({ id, hue, saturation, light }, currentCols, true))}
              className={`w-[50%] max-w-[125px] h-[40px] capitalize
              flex items-center justify-center 
              rounded-[8px] border-2 border-[currentColor]
              transition-colors duration-200 ${light > 50 ? "hover:bg-gray-800" : "hover:bg-gray-100"}
              ${light > 50 ? "hover:text-gray-100" : "hover:text-gray-800"}`}
            >
              Create Shade
            </button>
            <button
              onClick={addColumn && (() => addColumn({ id, hue, saturation, light }, currentCols, false))}
              className={`w-[50%] max-w-[125px] h-[40px] capitalize
              flex items-center justify-center 
              rounded-[8px] border-2 border-[currentColor]
              transition-colors duration-200 ${light > 50 ? "hover:bg-gray-800" : "hover:bg-gray-100"}
              ${light > 50 ? "hover:text-gray-100" : "hover:text-gray-800"}`}
            >
              Create Tint
            </button>

            <div className="min-w-full">
              <p className="mb-[8px]">Show color value as</p>
              <div className="flex justify-between items-center">
                <label
                  htmlFor={`${id}-HEX`}
                  className={`w-[50%] max-w-[125px] h-[40px] capitalize
                  flex items-center justify-center 
                  rounded-[8px] border-2 border-[currentColor]
                  transition-colors duration-200 ${light > 50 ? "hover:bg-gray-800" : "hover:bg-gray-100"}
                  ${light > 50 ? "hover:text-gray-100" : "hover:text-gray-800"}`}
                >
                  <input
                    onChange={handle_change}
                    type="checkbox"
                    name="HEX"
                    id={`${id}-HEX`}
                    value="HEX"
                    checked={colorValueType === "HEX"}
                    className="absolute left-[99999px] appearance-none peer"
                  />
                  <span>HEX</span>
                </label>

                <label
                  htmlFor={`${id}-RGB`}
                  className={`w-[50%] max-w-[125px] h-[40px] capitalize
                  flex items-center justify-center 
                  rounded-[8px] border-2 border-[currentColor]
                  transition-colors duration-200 ${light > 50 ? "hover:bg-gray-800" : "hover:bg-gray-100"}
                  ${light > 50 ? "hover:text-gray-100" : "hover:text-gray-800"}`}
                >
                  <span>RGB</span>
                  <input
                    className="absolute left-[99999px] appearance-none peer"
                    onChange={handle_change}
                    type="checkbox"
                    name="RGB"
                    id={`${id}-RGB`}
                    value="RGB"
                    checked={colorValueType === "RGB"}
                  />
                </label>

                <label
                  htmlFor={`${id}-HSL`}
                  className={`w-[50%] max-w-[125px] h-[40px] capitalize
                  flex items-center justify-center 
                  rounded-[8px] border-2 border-[currentColor]
                  transition-colors duration-200 ${light > 50 ? "hover:bg-gray-800" : "hover:bg-gray-100"}
                  ${light > 50 ? "hover:text-gray-100" : "hover:text-gray-800"}`}
                >
                  <span>HSL</span>
                  <input
                    className="absolute left-[99999px] appearance-none peer"
                    onChange={handle_change}
                    type="checkbox"
                    name="HSL"
                    id={`${id}-HSL`}
                    value="HSL"
                    checked={colorValueType === "HSL"}
                  />
                </label>
              </div>
            </div>

            {/* START::Copy Button */}
            <button
              disabled={showToast}
              onClick={() => copy_to_clipboard(color_values[colorValueType])}
              style={{ fill: determine_dark_or_light(light), stroke: determine_dark_or_light(light) }}
              className={`p-[6px] cursor-pointer rounded-md transition-colors duration-200 ${light > 60 ? "hover:bg-[#55555533]" : "hover:bg-[#eeeeee33]"}`}
            >
              {showToast ? (
                <svg width="35px" height="35px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                  <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                  <g id="SVGRepo_iconCarrier">
                    {" "}
                    <path
                      d="M22 11.1V6.9C22 3.4 20.6 2 17.1 2H12.9C9.4 2 8 3.4 8 6.9V8H11.1C14.6 8 16 9.4 16 12.9V16H17.1C20.6 16 22 14.6 22 11.1Z"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>{" "}
                    <path
                      d="M16 17.1V12.9C16 9.4 14.6 8 11.1 8H6.9C3.4 8 2 9.4 2 12.9V17.1C2 20.6 3.4 22 6.9 22H11.1C14.6 22 16 20.6 16 17.1Z"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>{" "}
                    <path d="M6.08008 15L8.03008 16.95L11.9201 13.05" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>{" "}
                  </g>
                </svg>
              ) : (
                <svg width="35px" height="35px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                  <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                  <g id="SVGRepo_iconCarrier">
                    {" "}
                    <path
                      d="M16 12.9V17.1C16 20.6 14.6 22 11.1 22H6.9C3.4 22 2 20.6 2 17.1V12.9C2 9.4 3.4 8 6.9 8H11.1C14.6 8 16 9.4 16 12.9Z"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>{" "}
                    <path
                      opacity="0.4"
                      d="M22 6.9V11.1C22 14.6 20.6 16 17.1 16H16V12.9C16 9.4 14.6 8 11.1 8H8V6.9C8 3.4 9.4 2 12.9 2H17.1C20.6 2 22 3.4 22 6.9Z"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>{" "}
                  </g>
                </svg>
              )}
            </button>
            {/* END::Copy Button */}
          </div>

          <div>
            <p className={`${light > 50 ? "text-gray-800" : "text-gray-100"} uppercase text-center text-[24px] font-bold mt-[24px]`}>
              {color_values[colorValueType]}
            </p>
          </div>

          <div>
            {/* <CustomChromePicker color={{h: 120, s: 60, l: 50, a: 1}} onChange={() => true}/> */}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Column;
