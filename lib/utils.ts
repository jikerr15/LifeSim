export const clamp = (value: number, min = 0, max = 100): number => Math.min(max, Math.max(min, value));

export const randomInt = (min: number, max: number): number =>
  Math.floor(Math.random() * (max - min + 1)) + min;

export const pickWeighted = <T extends { weight?: number }>(items: T[]): T | undefined => {
  if (!items.length) return undefined;
  const total = items.reduce((sum, item) => sum + (item.weight ?? 1), 0);
  let roll = Math.random() * total;
  for (const item of items) {
    roll -= item.weight ?? 1;
    if (roll <= 0) return item;
  }
  return items[items.length - 1];
};
