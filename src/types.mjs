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
const toArray = aryOrStr => (Array.isArray(aryOrStr) ? aryOrStr : aryOrStr.split(''));
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
export const deepMap = (data, func) => {
  const ary = toArray(data);
  if (Array.isArray(data)) {
    return ary.map(val => (isCharacterGroup(val) ? deepMap(val, func) : func(val)));
  }
  // since the data was a string, the array created from
  // the string won't contain any character groups
  return ary.map(char => func(char));
  // I could write it "ary.map(func)" but I'm not
  // just in case func has more than one argument
};
export const deepFlatMap = (data, func, res = []) => {
  const ary = toArray(data);
  if (Array.isArray(data)) {
    ary.forEach(val => res += isCharacterGroup(val) ? deepFlatMap(val, func) : func(val));
  } else {
    ary.forEach(char => res += func(char));
  }
  return res;
};
export const deepFlatResMap = (data, func) => {
  // this is different since it deals with functions that return Result objects.
  let res = '';
  let rem;
  if (Array.isArray(data)) {
    rem = data.map((val) => {
      if (isCharacterGroup(val)) {
        return deepFlatResMap(val, func);
      }
      return val;
    });
  } else {
    rem = data.split('');
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
