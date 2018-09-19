import { characterCollection, ENOARYLIKE } from './types';
// Unless you know bitwise operators pretty well,
// this file might be a bit hellish.
// Some knowledge of curried functions would be useful too.
// TODO: maybe simplify function?
const base = bool => (testFn) => {
  const recurseStr = (data) => {
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
  };
  const recurseAry = (data) => {
    const len = data.length;
    for (let i = 0; i < len; i++) {
      const val = data[i];
      const cc = characterCollection(val);
      const valSatisfiesTestFn = do {
        if (cc[0] & 2) {
          [recurseStr, recurseAry][cc[2]](cc[1]);
        } else {
          testFn(cc[1]);
        }
      };
      if (!bool ^ valSatisfiesTestFn) {
        return bool;
      }
    }
    return !bool;
  };
  return (data) => {
    if (typeof data === 'string') {
      return recurseStr(data);
    }
    if (Array.isArray(data)) {
      return recurseAry(data);
    }
    return ENOARYLIKE();
  };
};
export const contains = base(true);
export const isAll = base(false);
