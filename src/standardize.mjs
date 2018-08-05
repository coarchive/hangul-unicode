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
// standardizeCharacter: TI:>Character => CharacterGroup

export default (group => deepFlatMap(group, standardizeCharacter));
// default: UP:>CharacterGroup => String
