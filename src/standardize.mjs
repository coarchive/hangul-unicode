import { transformCharacter } from './transform';
import { composeComplex, composeComplexDepth3 } from './compose';
import { Character, deepMap, deepFlatMap } from './types';

const standardizeCharacterBase = compFn => (val) => {
  const res = transformCharacter(Character(val));
  if (Array.isArray(res)) {
    // atempt compose only if the value is an array
    // it's unfortunate, but any compFn is untrusting
    // since it's basically accessed publicly
    // we know that v will always have good types
    // but compFn will still check for Characters
    return compFn(res);
    // returns an Array
  }
  return res;
};
const standardizeCharacterNormal = standardizeCharacterBase(composeComplex);
const standardizeCharacterDepth3 = standardizeCharacterBase(composeComplexDepth3);
const selector = depth3 => (depth3 ? standardizeCharacterDepth3 : standardizeCharacterNormal);
export const standardizeCharacter = (char, Depth3) => selector(Depth3)(char);
export default ((data, grouped, depth3) => (grouped ? deepMap : deepFlatMap)(data, selector(depth3)));
