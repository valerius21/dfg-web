export const iterForm = (
  n: number,
  attentionTestsLocation: number[]
): number[] => {
  let arr = Array.from(Array(n).keys());
  let res = [...arr, ...attentionTestsLocation, ...attentionTestsLocation];
  res.sort((a, b) => a - b);
  return res;
};

export const fromNumbers = iterForm(60, [25, 50]); // ?
