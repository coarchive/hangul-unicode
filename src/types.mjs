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
export const ENOARYLIKE = () => throw TypeError('The data must be an Array or a String!');
export const toArray = aryOrStr => (Array.isArray(aryOrStr) ? aryOrStr : aryOrStr.split(''));
export const toString = strOrAry => (Array.isArray(strOrAry) ? strOrAry.join('') : `${strOrAry}`);
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
export const makeNiceOutput = val => val |> (isCharacterGroup(val) ? toArray : Character);
// while Characters can be a CharacterGroup,
// this function ignores characters
export const identity = i => i;
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
