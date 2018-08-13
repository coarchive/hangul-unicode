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
const ENOARYLIKE = () => { throw TypeError('The data must be an Array or a String!'); };
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
  } if (typeof val === 'string' && val.length > 1) {
    return true;
  }
  return false;
};
// while Characters can be a CharacterGroup,
// this function ignores characters
const identity = i => i;
export const deepMap = (data, func, useToArray) => {
  const modifier = useToArray ? toArray : identity;
  if (Array.isArray(data)) {
    return data.map(val => (isCharacterGroup(val) ? deepMap(val, func, useToArray) : modifier(func(val))));
  } if (typeof data === 'string') {
    // since the data was a string, the array created from
    // the string won't contain any character groups
    return data.split('').map(char => modifier(func(char)));
  }
  ENOARYLIKE();
};
export const deepFlatMap = (data, func) => {
  let res = '';
  if (Array.isArray(data)) {
    const len = data.length;
    for (let i = 0; i < len; i++) {
      // for is faster than forEach
      // this function is used a lot so I'll
      // take any optimization that I can get
      const val = data[i];
      if (isCharacterGroup(val)) {
        res += deepFlatMap(val, func);
      } else {
        const recurseRes = func(val);
        if (isCharacterGroup(recurseRes)) {
          res += deepFlatMap(recurseRes, identity);
        } else {
          res += recurseRes;
        }
      }
    }
  } else if (typeof data === 'string') {
    const len = data.length;
    for (let i = 0; i < len; i++) {
      const recurseRes = func(data[i]);
      if (isCharacterGroup(recurseRes)) {
        res += deepFlatMap(recurseRes, identity);
      } else {
        res += recurseRes;
      }
    }
  } else {
    ENOARYLIKE();
  }
  return res;
};
export const flatten = (data) => {
  if (Array.isArray(data)) {
    const res = [];
    const len = data.length;
    for (let i = 0; i < len; i++) {
      const val = data[i];
      if (isCharacterGroup(val)) {
        res.push(...flatten(val));
      } else {
        res.push(val);
      }
    }
    return res;
  } if (typeof data === 'string') {
    return data.split('');
  }
  ENOARYLIKE();
};
export const deepFlatResMap = (data, func) => {
  console.log({ data, func });
  // this is different since it deals with functions that return Result objects.
  // consumeLeftovers
  let rem;
  // remaining
  const res = [];
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
    debugger;
    const comp = func(rem);
    // func needs to return a Result like interface for this to work
    // otherwise we'll get a really nasty to debug error
    res.push(comp.result);
    rem = comp.remainder;
  }
  return res;
};
