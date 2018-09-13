import { isCharacterGroup } from './types';

// Unless you know bitwise operators pretty well,
// this file might be a bit hellish.
// Some knowledge of curried functions would be useful too.
// TODO: maybe simplify function?
const base = bool => (testFn) => {
  const recurse = (data) => {
    const len = data.length;
    if (Array.isArray(data)) {
      for (let i = 0; i < len; i++) {
        const val = data[i];
        if (!bool ^ (Array.isArray(val) ? recurse(val) : testFn(val))) {
          // TODO: the code already knows that the value is an Array
          // so don't check again when recursing?
          return bool;
        }
      }
      return !bool;
    } if (typeof data === 'string') {
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
    throw TypeError('The data must be an Array or a String!');
  };
  return recurse;
};
export const contains = base(true);
export const isAll = base(false);
