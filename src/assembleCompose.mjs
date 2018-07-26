import make from './make';
import isCharCollection from '../isCharCollection';

const fn = func => (aryLike) => {
  if (arguments.length > 2) {
    throw new Error('assembledComposes do not take more than one argument!');
  }
  const res = [];
  let rem = make(aryLike);
  const thisFn = fn(func);
  while (rem.some(isCharCollection)) {
    const subAryIdx = rem.findIndex(isCharCollection);
    rem.splice(subAryIdx, 1, ...thisFn(aryLike[subAryIdx]));
  }
  while (rem.length) {
    const comp = func(...rem);
    res.push(comp.result);
    rem = comp.remainder;
  }
  if (res.length === 1) {
    return res[0];
  }
  return res;
};
export default (fn);
// fn: ComposeFunction =>
