import transformCharacter from './transform';
import { composeAnyComplex } from './compose';
import { Character, deepFlatMap } from './types';

export function standardizeCharacter(val) {
  const v = transformCharacter(Character(val));
  if (Array.isArray(v)) {
    return composeAnyComplex(v);
  }
  return v;
}
export default (group => deepFlatMap(group, standardizeCharacter));
