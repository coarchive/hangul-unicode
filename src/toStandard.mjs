import assembleCompose from './assembleCompose';
import { transformCharacter } from './transformer';
import composeAnyComplex from './composeAnyComplex';
import { CharacterGroup } from './types';

const assembleAnyComplex = assembleCompose(composeAnyComplex);
export function toStandardCharacter(char) {
  const v = transformCharacter(char);
  if (Array.isArray(v)) {
    return assembleAnyComplex(v);
  }
  return v;
}
// toStandardChar: Character => String
export default (group => CharacterGroup(group).map(toStandardCharacter));
// public default: CharacterGroup => String
