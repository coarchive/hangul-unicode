import {
  ENOARYLIKE,
  isCharacterGroup,
  flatten,
} from './types';

export const deepMap = (func) => {
  let recurse;
  // yes, this sucks but eslint stays happy
  const shouldRecurse = val => (isCharacterGroup(val) ? recurse(val) : func(val));
  // WARNING: isCharacterGroup will return false for ['a']
  // this may cause problems if func expects a String with length 1!
  // what will happen is that ['a'] will be passed instead of 'a'!
  recurse = (data) => {
    if (Array.isArray(data)) {
      return data.map(shouldRecurse);
    } if (typeof data === 'string') {
      // since the data was a string, the array created from
      // the string won't contain any character groups
      return data.split('').map(char => func(char));
      // might want to use makeNiceOutput here too
    }
    return ENOARYLIKE();
    // satisfy consistent-return
  };
  return recurse;
};
const deepFlatMapHelper = func => (val) => {
  const recurseRes = func(val);
  if (isCharacterGroup(recurseRes)) {
    return flatten(recurseRes);
  }
  return recurseRes;
};
export const deepFlatMap = (func, data) => {
  // you may ask, why have a separate function for this
  // well, it's actually a little faster (I hope)
  let res = '';
  const isString = typeof data === 'string';
  if (Array.isArray(data) || isString) {
    const len = data.length;
    if (isString) {
      for (let i = 0; i < len; i++) {
        const cRes = func(data[i]);
        if (isCharacterGroup(cRes)) {
          res += flatten(cRes);
        } else {
          res += cRes;
        }
      }
    } else {
      for (let i = 0; i < len; i++) {
        // for is faster than forEach
        // this function is used a lot so I'll
        // take any optimization that I can get
        const val = data[i];
        if (isCharacterGroup(val)) {
          res += recurse(val);
        } else {
          res += helper(val);
        }
      }
    }
    return res;
  }
  return ENOARYLIKE();
};
export const deepFlatResMap = (func) => {
  // this is different since it deals with functions that return Result objects.
  // hence "Res"
  const recurse = (data) => {
    let rem;
    // remaining
    let res = '';
    // result
    if (Array.isArray(data)) {
      rem = [];
      const len = data.length;
      for (let i = 0; i < len; i++) {
        const val = data[i];
        if (isCharacterGroup(val)) {
          rem.push(...recurse(func));
          // deepFlatResMap always returns an array
          // (or at least it should)
        } else {
          rem.push(val);
        }
      }
    } else if (typeof data === 'string') {
      rem = data.split('');
      // could have used toArray but since we already know
      // the type of this, there's no need to
    } else {
      // it's not an Array or a String
      ENOARYLIKE();
    }
    while (rem.length) {
      const comp = func(rem);
      // func needs to return a Result like interface for this to work
      // otherwise we'll get a really nasty to debug error
      res += comp.result;
      rem = comp.remainder;
    }
    return res;
  };
  return recurse;
};
export const publicMap = (fn) => {
  const map = deepMap(fn);
  const flat = deepFlatMap(fn);
  return (data, opts = {}) => data |> (opts.grouped ? map : flat);
};
export const publicMapOpts = (fn, data, opts = {}) => {

};
data |> (fn(opts) |> (opts.grouped ? deepMap : deepFlatMap));
