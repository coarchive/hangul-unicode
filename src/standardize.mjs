import composeAnyComplex from './composeAnyComplex';
import transformCharacter from './transformCharacter';
import { CharacterGroup } from './types';

export function standardizeCharacter(char) {
  const v = transformCharacter(char);
  if (Array.isArray(v)) {
    return composeAnyComplex(v);
  }
  return v;
}
// standardizeCharacter: TI:>Character => CharacterGroup

export default (group => new CharacterGroup(group).map(standardizeCharacter));
// default: UP:>CharacterGroup => String
