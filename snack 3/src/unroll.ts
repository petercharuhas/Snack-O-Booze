export function unroll<T>(squareArray: T[][]): T[] {
  if (!squareArray.length) return [];
  
  const result: T[] = [];
  let top = 0;
  let bottom = squareArray.length - 1;
  let left = 0;
  let right = squareArray[0].length - 1;

  while (top <= bottom && left <= right) {
    // Move right
    for (let i = left; i <= right; i++) {
      result.push(squareArray[top][i]);
    }
    top++;

    // Move down
    for (let i = top; i <= bottom; i++) {
      result.push(squareArray[i][right]);
    }
    right--;

    if (top <= bottom) {
      // Move left
      for (let i = right; i >= left; i--) {
        result.push(squareArray[bottom][i]);
      }
      bottom--;
    }

    if (left <= right) {
      // Move up
      for (let i = bottom; i >= top; i--) {
        result.push(squareArray[i][left]);
      }
      left++;
    }
  }

  return result;
}