export function generate_hue(): number {
  return Math.floor(Math.random() * 361);
}

// I updated the function to receive min and max value in order to control the intensity of the colors because lighter colors are more inviting and easier on the eyes.
export function generate_percentage(min: number, max: number): number {
  let random_number = (Math.random() * (max - min) + min);

  if (random_number < 0.1) return 0.0;

  if (random_number > 99.9) return 100.0;

  return +random_number.toFixed(2);
}


// Currently not being used.
export function construct_random_color(): number[] {
  const hue = generate_hue();
  const light = generate_percentage(80, 30);
  const saturation = generate_percentage(80, 30);

  return [hue, saturation, light];
}