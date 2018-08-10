import { transformCharacter } from './transform';
import { composeComplex, composeComplexDepth3 } from './compose';
import { Character, deepMap, deepFlatMap } from './types';

const standardizeCharacterBase = compFn => (val) => {
  const v = transformCharacter(Character(val));
  if (Array.isArray(v)) {
    // atempt compose only if the value is an array
    return compFn(v);
    // returns an Array
  }
  return v;
};
const standardizeCharacterNormal = standardizeCharacterBase(composeComplex);
const standardizeCharacterDepth3 = standardizeCharacterBase(composeComplexDepth3);
const selector = depth3 => (depth3 ? standardizeCharacterDepth3 : standardizeCharacterNormal);
export const standardizeCharacter = (char, Depth3) => selector(Depth3)(char);
export default ((data, grouped, depth3) => (grouped ? deepMap : deepFlatMap)(data, selector(depth3)));
//
