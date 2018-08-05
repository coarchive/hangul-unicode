export const Character = (val) => {
  const str = `${val}`;
  // not using .toString because Symbol.toPrimitive overrides when present
  if (str.length !== 1) {
    throw Error(`"${str}" is not a Character!`);
  }
  return str;
};
const toArray = aryOrStr => (Array.isArray(aryOrStr) ? aryOrStr : aryOrStr.split(''));
export const isCharacterGroup = val => val.length > 1 && (Array.isArray(val) || typeof val === 'string');
// while Characters can be a CharacterGroup, this function ignores characters
export const deepMap = (ary, func) => (
  toArray(ary).map(val => (
    isCharacterGroup(val) ? deepMap(val, func) : func(val)
  ))
);
export const deepFlatMap = (data, func) => {
  let res = ''; // changing this to an array makes the entire thing not flat
  // of course, the concatination in the while loop would need to be changed
  // too, but it's neat how a change in a data type makes changes this dramatic
  let rem;
  // if the group is not a String then there can't be any sub groups
  if (Array.isArray(data)) {
    rem = data.map((val) => {
      if (isCharacterGroup(val)) {
        return deepFlatMap(val, func);
      }
      return val;
    });
  } else {
    rem = data.split('');
  }
  while (rem.length) {
    const comp = func(rem);
    // func needs to return a Result like interface for this to work
    res += comp.result;
    rem = comp.remainder;
  }
  return res;
};
export const noResDeepFlatMap = (data, func) => {
  let res = '';
  toArray(data).forEach(val => res += isCharacterGroup(val) ? noResDeepFlatMap(val) : func(val));
  return res;
};
