export default function range(start: number, end: number): number[] {
  if (start >= end) {
    return [];
  }
  let arr = new Array(end - start - 1).fill(0).map((_, index) => index)

  return arr.map((key: number): number => key + start);
};
