import { characterCollection, ENOARYLIKE, toString } from './types';


function flatMapInternal(fn, data) {
  let res = '';
  const len = data.length;
  for (let i = 0; i < len; i++) {
    const val = data[i];
    const cc = characterCollection(val);
    // TODO: use cc[2]
    if (cc[0] & 2) {
      // the data is a characterGroup
      res += flatMapInternal(fn, cc[1]);
    } else {
      res += fn(cc[1]) |> toString;
    }
  }
  return res;
}
function mapInternal(fn, data) {
  const res = [];
  const len = data.length;
  for (let i = 0; i < len; i++) {
    const val = data[i];
    const cc = characterCollection(val);
    if (cc[0] & 2) {
      // the data is a characterGroup
      res.push(mapInternal(fn, cc[1]));
    } else {
      res.push(cc[1] |> fn);
    }
  }
  return res;
}
// I know that this is basically the same code but
// I'm not sure how to remove redundancy
const mapWrap = internalFn => (fn, data) => {
  if (typeof data === 'string' || Array.isArray(data)) {
    return internalFn(fn, data);
  }
  console.error(data);
  ENOARYLIKE();
};
export const flatMap = mapWrap(flatMapInternal);
export const map = mapWrap(mapInternal);
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
        // deepFlatResMap always returns an array
        // (or at least it should)
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
