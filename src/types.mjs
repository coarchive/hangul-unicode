export const valCharacter = (val) => {
  const str = `${val}`;
  // not using .toString because Symbol.toPrimitive overrides when present
  if (str.length !== 1) {
    return [false, val];
  }
  return [true, str];
};
export const character = (val) => {
  const vC = valCharacter(val);
  if (vC[0]) {
    return vC[1];
  }
  throw Error(`"${val}" is not a Character!`);
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
  } else if (typeof val === 'string') {
    if (val.length < 2) {
      return [1, val, 0];
    }
    if (val.length > 1) {
      return [2, val, 0];
    }
  } else if (typeof val === 'number') {
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
// this function does it all!

export const ENOARYLIKE = () => throw TypeError('The data must be an Array or String!');
export function toString(data) {
  if (typeof data === 'string') {
    return data;
  }
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
// this is basically deep toString
// [[['foobar'], 'baz'], 'q', 'u', 'x'] => "foobarbazqux"
export const toArray = data => (Array.isArray(data) ? data : data.split(''));
export const formatType = (data) => {
  const cc = characterCollection(data);
  if (!cc[2] && cc[0] & 2) {
    return cc[1].split('');
  }
  return cc[1];
};
