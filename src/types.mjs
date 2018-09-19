export const character = (val) => {
  const str = `${val}`;
  // not using .toString because Symbol.toPrimitive overrides when present
  if (str.length !== 1) {
    throw Error(`"${str}" is not a Character!`);
  }
  return str;
};
// this function turns values into characters if it can
// otherwise it just fails
export const characterCollection = (val) => {
  if (Array.isArray(val)) {
    if (val.length > 1) {
      return [2, val, 1];
    }
    if (val.length === 1) {
      return characterCollection(val[0]);
    }
  }
  if (typeof val === 'string') {
    if (val.length === 1) {
      return [1, val, 0];
    }
    if (val.length > 1) {
      return [2, val, 0];
    }
  }
  if (typeof val === 'number') {
    const str = `${val}`;
    if (str.length !== 1) {
      return [2, str, 0];
    }
    return [1, str, 0];
  }
  return [1, character(val), 0];
};
// characterCollection returns an Array
/*
enum charType {
  nothing
  Character,
  CharacterGroup,
}
enum returnType {
  String,
  Array,
}
[charType, Array | String, returnType]
*/
export const ENOARYLIKE = () => throw TypeError('The data must be an Array or String!');
export function toString(data) {
  let res = '';
  const len = data.length;
  for (let i = 0; i < len; i++) {
    const val = data[i];
    if (Array.isArray(val)) {
      // the data is a characterGroup
      res += toString(val);
    } else {
      res += val;
    }
  }
  return res;
}
export const toArray = data => (Array.isArray(data) ? data : data.split(''));
// this function does it all!
