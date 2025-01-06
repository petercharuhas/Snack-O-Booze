import { unroll } from './unroll';

describe('unroll', () => {
  test('handles 4x4 number matrix', () => {
    const square = [
      [1, 2, 3, 4],
      [5, 6, 7, 8],
      [9, 10, 11, 12],
      [13, 14, 15, 16]
    ];
    expect(unroll(square)).toEqual([1, 2, 3, 4, 8, 12, 16, 15, 14, 13, 9, 5, 6, 7, 11, 10]);
  });

  test('handles 3x3 string matrix', () => {
    const square = [
      ["a", "b", "c"],
      ["d", "e", "f"],
      ["g", "h", "i"]
    ];
    expect(unroll(square)).toEqual(["a", "b", "c", "f", "i", "h", "g", "d", "e"]);
  });

  test('handles empty matrix', () => {
    expect(unroll([])).toEqual([]);
  });
});