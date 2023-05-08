export const color_column_motion_config = {
  whileHover: "hover",
  initial: "rest",
  animate: "rest",
  transition: { ease: "easeInOut", type: "tween", staggerChildren: 0.1 },
};

export const fade_in_up = {
  rest: { opacity: 0, duration: 0.3, type: "tween" },
  hover: {
    opacity: 1,
    transition: {
      duration: 0.3,
      type: "tween",
      delay: 0.2
    },
  },
};
