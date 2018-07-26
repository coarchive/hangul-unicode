// this file is for checking types so that Hangul can error correctly
export const Character = (val) => {
  const str = `${val}`;
  if (str.length !== 1) {
    throw Error("Strings longer than one aren't Characters");
  }
  return str;
};
// Character: * => String
export const isCharacterGroup = (val) => {
  if (val.length > 1) {
    if (Array.isArray(val)) {
      return 'array';
    } if (typeof val === 'string') {
      return 'string';
    }
  }
  return false;
};
// isCharacterGroup: Array | String => String
class CharacterGroupClass extends Array {
  constructor(ary) {
    super();

  }
}
export const CharacterGroup = (ary) => {
  if (typeof ary === 'string') {
    if (ary.length > 1) {
      return Array.from(ary);
    }
    return [Character(ary)];
  } if (Array.isArray(ary)) {
    return ary;
  }
  throw TypeError('A character group must be a String or Array');
};
// CharacterGroup * => Array
