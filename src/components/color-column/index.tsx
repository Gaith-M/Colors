import { AnimatePresence, motion } from "framer-motion";
import { Color_Column_Props } from "../../constants/interfaces";
import { determine_dark_or_light, hsl_to_hex } from "../../utils";
import { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { color_column_motion_config, fade_in_up } from "../../constants/motion_variants";
import { color_column_container, color_column_menu_container } from "./styles";
import ColorPicker from "../color-picker";


const ColorColumn = ({
  data: { id, hue, saturation, light, locked },
  handle_delete,
  handle_edit,
  handle_lock,
  create_shades,
  shades_window_state,
  close_shades_window,
  select_shades,
  create_column_button,
  destroy_column_button,
  position,
  show_create_button
}: Color_Column_Props) => {
  // Attributes for the sorting functionality
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
  // Styles for the sorting functionality
  const style = { transform: CSS.Transform.toString(transform), transition };

  //This state handles displaying an svg which indicates a successful copy operation
  const [showToast, setShowToast] = useState(false);

  //Copy to clipboard logic
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

  let left_button_position = `translate(-50%, calc(50vh - 20px))`;
  let right_button_position = `translate(25%, calc(50vh - 20px))`;

  if (position.first) {
    left_button_position = `translate( 10px, calc(50vh - 20px))`;
  }

  if (position.last) {
    right_button_position = `translate( -10px, calc(50vh - 20px))`;
  }

  return (
    <motion.div
      ref={setNodeRef}
      {...color_column_motion_config}
      className={color_column_container}
      style={{ color: `hsla(${hue}, ${saturation}%, ${light}%, 1)`, backgroundColor: "currentcolor", ...style }}
      onClick={() => close_shades_window(id)}
    >
      {/* Left side bar and button */}
      <div onMouseEnter={() => create_column_button(id, "left")} onMouseLeave={destroy_column_button} className="absolute w-[30px] h-full z-10 top-0 left-0">
        {show_create_button?.open && show_create_button.col_id === id && show_create_button.side === 'left' && position.first && (
          <button
            className="w-[40px] h-[40px] rounded-full flex items-center justify-center bg-[#e3e3e3] border shadow-md"
            style={{ transform: left_button_position }}
          >
            <svg width="25px" height="25px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="#000000" transform="rotate(0)">
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
              <g id="SVGRepo_iconCarrier">
                <title></title>
                <g id="Complete">
                  <g data-name="add" id="add-2">
                    <g>
                      <line fill="none" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="12" x2="12" y1="19" y2="5"></line>
                      <line fill="none" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="5" x2="19" y1="12" y2="12"></line>
                    </g>
                  </g>
                </g>
              </g>
            </svg>
          </button>
        )}

        {show_create_button?.open && show_create_button.col_id === id && show_create_button.side === 'left' && !position.first && !position.last && (
          <button
            className="w-[40px] h-[40px] rounded-full flex items-center justify-center bg-[#e3e3e3] border shadow-md"
            style={{ transform: left_button_position }}
          >
            <svg width="25px" height="25px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="#000000" transform="rotate(0)">
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
              <g id="SVGRepo_iconCarrier">
                <title></title>
                <g id="Complete">
                  <g data-name="add" id="add-2">
                    <g>
                      <line fill="none" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="12" x2="12" y1="19" y2="5"></line>
                      <line fill="none" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="5" x2="19" y1="12" y2="12"></line>
                    </g>
                  </g>
                </g>
              </g>
            </svg>
          </button>
        )}
      </div>

      <motion.div variants={fade_in_up} className={color_column_menu_container}>
        <div className="mt-[24px] min-w-full" style={{ color: determine_dark_or_light(light) }}>
          <div className="flex flex-col items-center justify-between gap-[8px]">
            <ColorPicker id={id} color_values={{ hue, saturation, light }} handle_edit={handle_edit} />

            {/* START::Copy Button */}
            <button
              disabled={showToast}
              onClick={() => copy_to_clipboard(hsl_to_hex(hue, saturation, light))}
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

            {/* START::Shades Button */}
            <button
              onClick={() => create_shades(id, { hue, saturation, light })}
              style={{ fill: determine_dark_or_light(light), stroke: determine_dark_or_light(light) }}
              className={`p-[6px] cursor-pointer rounded-md transition-colors duration-200 ${light > 60 ? "hover:bg-[#55555533]" : "hover:bg-[#eeeeee33]"}`}
            >
              <svg width="35px" height="35px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                <g id="SVGRepo_iconCarrier">
                  {" "}
                  <path
                    d="M3 8.976C3 4.05476 4.05476 3 8.976 3H15.024C19.9452 3 21 4.05476 21 8.976V15.024C21 19.9452 19.9452 21 15.024 21H8.976C4.05476 21 3 19.9452 3 15.024V8.976Z"
                    strokeWidth="1.2"
                  ></path>{" "}
                  <path d="M12 3V21" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"></path>{" "}
                  <path d="M21 12L3 12" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"></path>{" "}
                </g>
              </svg>
            </button>
            {/* END::Shades Button */}

            {/* START::Drag Handler */}
            <button
              {...attributes}
              {...listeners}
              style={{ fill: determine_dark_or_light(light), stroke: determine_dark_or_light(light) }}
              className={`p-[6px] cursor-move rounded-md transition-colors duration-200 ${light > 60 ? "hover:bg-[#55555533]" : "hover:bg-[#eeeeee33]"}`}
            >
              <svg
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
                <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4.303991999999999"></g>
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

            {/* START::Lock Button */}
            <button
              tabIndex={-999}
              onClick={() => handle_lock(id)}
              className={`p-[6px] cursor-pointer rounded-md transition-colors duration-200 ${light > 60 ? "hover:bg-[#55555533]" : "hover:bg-[#eeeeee33]"}`}
            >
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
            {/* END::Lock Button */}

            {/* START::Delete Button */}
            {!locked && (
              <button
                style={{ fill: determine_dark_or_light(light), stroke: determine_dark_or_light(light) }}
                onClick={() => handle_delete(id)}
                className={`p-[10px] cursor-pointer rounded-md transition-colors duration-200 ${light > 60 ? "hover:bg-[#55555533]" : "hover:bg-[#eeeeee33]"}`}
              >
                <svg width="50px" height="50px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                  <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                  <g id="SVGRepo_iconCarrier">
                    {" "}
                    <path d="M16 8L8 16M8 8L16 16" strokeWidth="1" strokeLinecap="round"></path>{" "}
                  </g>
                </svg>
              </button>
            )}
            {/* END::Delete Button */}
          </div>
        </div>
      </motion.div>

      {/* Right side bar and button */}
      <div onMouseEnter={() => create_column_button(id, "right")} onMouseLeave={destroy_column_button} className="absolute w-[30px] h-full z-10 top-0 right-0">
        {show_create_button?.open && show_create_button.col_id === id && show_create_button.side === 'right' && position.last && (
          <button
            className="w-[40px] h-[40px] rounded-full flex items-center justify-center bg-[#e3e3e3] border shadow-md"
            style={{ transform: 'translate(-60%, calc(50vh - 20px))' }}
          >
            <svg width="25px" height="25px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="#000000" transform="rotate(0)">
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
              <g id="SVGRepo_iconCarrier">
                <title></title>
                <g id="Complete">
                  <g data-name="add" id="add-2">
                    <g>
                      <line fill="none" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="12" x2="12" y1="19" y2="5"></line>
                      <line fill="none" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="5" x2="19" y1="12" y2="12"></line>
                    </g>
                  </g>
                </g>
              </g>
            </svg>
          </button>
        )}

        {show_create_button?.open && show_create_button.col_id === id && show_create_button.side === 'right' && !position.first && !position.last && (
          <button
            className="w-[40px] h-[40px] rounded-full flex items-center justify-center bg-[#e3e3e3] border shadow-md"
            style={{ transform: right_button_position }}
          >
            <svg width="25px" height="25px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="#000000" transform="rotate(0)">
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
              <g id="SVGRepo_iconCarrier">
                <title></title>
                <g id="Complete">
                  <g data-name="add" id="add-2">
                    <g>
                      <line fill="none" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="12" x2="12" y1="19" y2="5"></line>
                      <line fill="none" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="5" x2="19" y1="12" y2="12"></line>
                    </g>
                  </g>
                </g>
              </g>
            </svg>
          </button>
        )}
      </div>

      <AnimatePresence>
        {shades_window_state.open && shades_window_state.id === id && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ type: "tween", duration: 0.5, delay: 0.1 }}
            className="absolute z-50 min-w-full min-h-full top-0 left-0 flex flex-col"
          >
            {shades_window_state.values?.map(({ hue, saturation, light }) => {
              let hex = hsl_to_hex(hue, saturation, light);
              return (
                <div
                  key={hex}
                  style={{ backgroundColor: hex, color: determine_dark_or_light(light) }}
                  className="flex-1 flex items-center justify-center font-bold uppercase cursor-pointer group"
                  onClick={() => select_shades(id, { hue, saturation, light })}
                >
                  <span className="opacity-0 transition-opacity duration-150 group-hover:opacity-100">{hex}</span>
                </div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ColorColumn;
