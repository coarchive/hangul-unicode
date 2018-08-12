import { transformCharacter } from './transform';
import { composeComplex } from './compose';
import { Character, deepMap, deepFlatMap } from './types';

export const standardizeCharacterBase = mode => (val) => {
  const res = transformCharacter(Character(val));
  if (Array.isArray(res)) {
    // atempt compose only if the value is an array
    // it's unfortunate, but any compFn is untrusting
    // since it's basically accessed publicly
    // we know that v will always have good types
    // but compFn will still check for Characters
    return composeComplex(val, mode);
    // returns an Array
  }
  return res;
};
export default ((data, grouped, mode) => (grouped ? deepMap : deepFlatMap)(data, standardizeCharacterBase(mode)));
