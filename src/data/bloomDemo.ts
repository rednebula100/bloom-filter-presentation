export const BIT_COUNT = 16;

export const insertedItems = [
  { word: "apple", positions: [3, 8, 14] },
  { word: "banana", positions: [2, 8, 11] },
  { word: "grape", positions: [3, 6, 11] },
  { word: "orange", positions: [2, 6, 14] },
] as const;

export const applePositions = [3, 8, 14];
export const melonPositions = [3, 8, 11];
export const finalActivePositions = [2, 3, 6, 8, 11, 14];

export function bitsFor(positions: readonly number[]) {
  return Array.from({ length: BIT_COUNT }, (_, index) => positions.includes(index));
}
