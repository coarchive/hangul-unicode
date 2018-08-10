import { transformCharacter } from './transform';
import { composeAnyComplex } from './compose';
import { Character, deepMap, deepFlatMap } from './types';

export function standardizeCharacter(val) {
  const v = transformCharacter(Character(val));
  if (Array.isArray(v)) {
    // atempt compose only if the value is an array
    return composeAnyComplex(v);
    // returns an Array
  }
  return v;
  // always return the same type
}
export default ((group, grouped) => (grouped ? deepMap : deepFlatMap)(group, standardizeCharacter));
