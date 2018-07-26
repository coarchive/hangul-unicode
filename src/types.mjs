// this file is for checking types so that Hangul can error correctly
export const Character = (inp) => {
  const str = `${inp}`;
  if (str.length !== 1) {
    throw Error("Strings longer than one aren't Characters");
  }
  return str;
};
// Character: * => String
export const isCharacterGroup = (ary) => {
  if ((Array.isArray(ary) || typeof ary === 'string') && ary.length > 1) {
    return true;
  }
  return false;
};
export const CharacterGroup = (ary) => {
  if (typeof ary === 'string') {
    if (ary.length > 1) {
      return [Character(ary)];
    }
    return Array.from(ary);
  } if (Array.isArray(ary)) {
    return ary;
  }
  throw TypeError('A character group must be a String or Array');
};
// CharacterGroup * => Array
