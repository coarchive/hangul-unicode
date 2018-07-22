export default (fn => (ary) => {
  const res = [];
  let rem = ary;
  while (rem.length) {
    const comp = fn(...rem);
    res.push(comp.result);
    rem = comp.remainder;
  }
  if (res.length === 1) {
    return res[0];
  }
  return res;
});
