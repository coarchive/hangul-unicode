import transformCharacter from './transform';
import { composeAnyComplex } from './compose';
import { Character, deepFlatMap } from './types';

export function standardizeCharacter(val) {
  const v = transformCharacter(Character(val));
  if (Array.isArray(v)) {
    return composeAnyComplex(v);
  }
  // if it's not an array, that means that transforming the
  // character was just a string so we can just return it
  return v;
}
export default (group => deepFlatMap(group, standardizeCharacter));
