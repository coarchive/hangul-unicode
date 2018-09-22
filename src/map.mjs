import { characterCollection, ENOARYLIKE, toString } from './types';

export function flatMapStr(fn, str) {
  let res = '';
  const len = str.length;
  for (let i = 0; i < len; i++) {
    res += str[i] |> fn |> toString;
    // we already know that data[i] it's a String
    // we also already know it's a character
  }
  return res;
}
function flatMapAry(fn, ary) {
  let res = '';
  const len = ary.length;
  for (let i = 0; i < len; i++) {
    const cc = characterCollection(ary[i]);
    if (cc[0] & 2) {
      // the cc[1] is a characterGroup
      res += (cc[2] ? flatMapAry : flatMapStr)(fn, cc[1]);
    } else {
      res += cc[1] |> fn |> toString;
    }
  }
  return res;
}
function mapStr(fn, str) {
  const res = [];
  const len = str.length;
  for (let i = 0; i < len; i++) {
    res.push(str[i] |> fn);
    // TODO: add a |> toArray if needed?
  }
  return res;
}
function mapAry(fn, data) {
  const res = [];
  const len = data.length;
  for (let i = 0; i < len; i++) {
    const val = data[i];
    const cc = characterCollection(val);
    if (cc[0] & 2) {
      res.push((cc[2] ? mapAry : mapStr)(fn, cc[1]));
    } else {
      res.push(cc[1] |> fn);
      // TODO: add a |> toArray if needed?
    }
  }
  return res;
}
// I know that this is basically the same code but
// I'm not sure how to remove redundancy
const mapWrap = (strFn, aryFn) => (fn, data) => {
  if (typeof data === 'string') {
    return strFn(fn, data);
  }
  if (Array.isArray(data)) {
    return aryFn(fn, data);
  }
  console.error(data);
  return ENOARYLIKE();
};
export const flatMap = mapWrap(flatMapStr, flatMapAry);
export const map = mapWrap(mapStr, mapAry);
export function flatResReducer(fn, data) {
  let res = '';
  // result
  let rem;
  // remaining
  if (Array.isArray(data)) {
    rem = '';
    const len = data.length;
    for (let i = 0; i < len; i++) {
      const val = data[i];
      const cc = characterCollection(val);
      if (cc[0] & 2) {
        rem += flatResReducer(fn, cc[1]);
        // this should always be returning a String
      } else {
        rem += cc[1];
      }
    }
  } else if (typeof data === 'string') {
    rem = data;
    // we know the type so there's no need to check
    // for CharacterGroups within the String
  } else {
    // it's not an Array or a String
    ENOARYLIKE();
  }
  while (rem.length) {
    const comp = fn(rem);
    // func needs to return a Result like interface for this to work
    // otherwise we'll get a really nasty to debug error
    res += comp.result;
    rem = comp.remainder;
  }
  return res;
}
// this is a special type of mapping function
// the input to the fn argument is a CharacterGroup
// rather than a single character
export const generalMap = (fn, opts, data) => (opts.grouped ? map : flatMap)(fn, data);
export const curriedMap = fn => (data, opts = {}) => generalMap(fn, opts, data);
