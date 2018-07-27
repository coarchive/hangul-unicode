import assembleCompose from './assembleCompose';
import { transformCharacter } from './transformer';
import composeAnyComplex from './composeAnyComplex';
import { CharacterGroup } from './types';

const assembleAnyComplex = assembleCompose(composeAnyComplex);
export function toStandardCharacter(char) {
  const v = transformCharacter(char);
  if (Array.isArray(v)) {
    return composeAnyComplex(v);
  }
  return v;
}
// toStandardCharacter: UI:>Character => CharacterGroup
export default (group => CharacterGroup(group).map(toStandardCharacter));
// default: UP:>CharacterGroup => String
