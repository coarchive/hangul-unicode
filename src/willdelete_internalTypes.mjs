// all values prefixed by "UI:>" should be using some part of this module
export const E = (group, str, val) => {
  console.groupCollapsed(group);
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
  } if (str !== inp) {
    console.groupCollapsed('Not Paranoia @ Character');
    console.trace();
    console.warn("It's not paranoia, calls to internalTypes are changing things!");
    console.table({ original: { value: inp }, modified: { value: str } });
    console.groupEnd();
  }
  return str;
};
// Character: { Character } from './types'
export const EnforceArray = (ary) => {
  if (Array.isArray(ary)) {
    return ary;
  }
  E('Array', 'Enforced Array Only!', ary);
};
// CharacterGroup: { CharacterGroup } from './types'
