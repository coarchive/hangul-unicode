export const Character = (val) => {
  const str = `${val}`;
  // not using .toString because Symbol.toPrimitive overrides when present
  if (str.length !== 1) {
    throw Error(`"${str}" is not a Character!`);
  }
  return str;
};
// this function turns values into characters if it can
// otherwise it just fails
const ENOARYLIKE = () => throw TypeError('The data must be an Array or a String!');
export const toArray = aryOrStr => (Array.isArray(aryOrStr) ? aryOrStr : aryOrStr.split(''));
// as a general note, calling .split like that instead of .split`` is faster
export const isCharacterGroup = (val) => {
  if (val.length < 1) {
    return false;
  } if (Array.isArray(val)) {
    if (val.length > 1) {
      return true;
    }
    return isCharacterGroup(val[0]);
  }
  return typeof val === 'string' && val.length > 1;
};
// type CharacterGroup = Array<Character | CharacterGroup>
export const makeNiceOutput = val => (isCharacterGroup(val) ? toArray : Character)(val);
// while Characters can be a CharacterGroup,
// this function ignores characters
export const identity = i => i;
export const deepMap = (func) => {
  const recurse = deepMap(func);
  const shouldRecurse = val => (isCharacterGroup(val) ? recurse(val) : func(val));
  // might want to use makeNiceOutput above
  return (data) => {
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
};
export const flatten = (data) => {
  if (Array.isArray(data)) {
    let res = '';
    const len = data.length;
    for (let i = 0; i < len; i++) {
      const val = data[i];
      if (isCharacterGroup(val)) {
        res += flatten(val);
      } else {
        res += val;
      }
    }
    return res;
  } if (typeof data === 'string') {
    return data;
  }
  return ENOARYLIKE();
};
const deepFlatMapHelper = func => (val) => {
  const recurseRes = func(val);
  if (isCharacterGroup(recurseRes)) {
    return flatten(recurseRes);
  }
  return recurseRes;
};
export const deepFlatMap = (func) => {
  const helper = deepFlatMapHelper(func);
  const recurse = (data) => {
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
  return recurse;
};
/*
else if (typeof data === 'string') {
 const len = data.length;

} else {
*/
export const deepFlatResMap = (data, func) => {
  // this is different since it deals with functions that return Result objects.
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
        rem.push(...deepFlatResMap(val, func));
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
