export function generate_hue(): number {
  return Math.floor(Math.random() * 361);
}

export function generate_percentage(): number {
  let random_number = Math.random() * 100;

  if (random_number < 0.1) return 0.0;

  if (random_number > 99.9) return 100.0;

  return +random_number.toFixed(2);
}

export function construct_random_color(): number[] {
  const hue = generate_hue();
  const light = generate_percentage();
  const saturation = generate_percentage();

  return [hue, saturation, light];
}
