// this file is for checking types so that Hangul can error correctly
// all values prefixed by "UP:>" should be using some part of this module
export const Character = (val) => {
  const str = `${val}`;
  if (str.length !== 1) {
    throw Error("Strings longer than one aren't Characters");
  }
  return str;
};
// Character: * => String
export const isCharacterGroup = (val) => {
  if (val.length > 1 && (Array.isArray(val) || typeof val === 'string')) {
    return true;
  }
  return false;
};
// isCharacterGroup: Array | String => String
export const CharacterGroup = (val) => {
  if (typeof val === 'string') {
    if (val.length > 1) {
      return Array.from(val);
    }
    return [Character(val)];
  } if (Array.isArray(val)) {
    return val;
  }
  throw TypeError('A character group must be a String or Array');
};
// CharacterGroup * => Array
