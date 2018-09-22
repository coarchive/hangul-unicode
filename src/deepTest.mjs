import { characterCollection, ENOARYLIKE } from './types';
// Unless you know bitwise operators pretty well,
// this file might be a bit hellish.

function recurseStr(testFn, bool, data) {
  const len = data.length;
  for (let i = 0; i < len; i++) {
    const val = data[i];
    if (!bool ^ testFn(val)) {
      // what kind of unholy person coded this?
      // me.
      return bool;
    }
  }
  return !bool;
}
function recurseAry(testFn, bool, data) {
  const len = data.length;
  for (let i = 0; i < len; i++) {
    const val = data[i];
    const cc = characterCollection(val);
    const valSatisfiesTestFn = do {
      if (cc[0] & 2) {
        [recurseStr, recurseAry][cc[2]](testFn, bool, cc[1]);
      } else {
        testFn(cc[1]);
      }
    };
    if (!bool ^ valSatisfiesTestFn) {
      return bool;
    }
  }
  return !bool;
}
const base = bool => testFn => (data) => {
  if (typeof data === 'string') {
    return recurseStr(testFn, bool, data);
  }
  if (Array.isArray(data)) {
    return recurseAry(testFn, bool, data);
  }
  return ENOARYLIKE();
};
export const contains = base(true);
export const isAll = base(false);
