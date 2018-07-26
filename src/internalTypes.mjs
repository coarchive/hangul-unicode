export const E = (group, str, val) => {
  console.group(group);
  console.error(str);
  console.log(val);
  console.groupEnd();
  throw Error(`Critical Stop @ ${group}`);
};
// E: String => String => * => Undefined
export const Character = (inp) => {
  const str = `${inp}`;
  if (str.length !== 1) {
    E('Character', "Strings longer than one aren't Characters", str, inp);
  }
  return str;
};
// Character: { Character } from './types'
export const CharacterGroup = (ary) => {
  if ((Array.isArray(ary) || typeof ary === 'string') && ary.length > 1) {
    return Array.from(ary);
  }
  E('CharacterGroup', 'A character group must be a String or Array', ary);
};
// CharacterGroup: { CharacterGroup } from './types'
