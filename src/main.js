import { isSyllable } from './unicode/blocks';
import { isConsonant, isVowel } from './unicode/characters';
import {
  isHangul,
  isStandardHangul,
  isAllHangul,
  isAllStandardHangul,
  containsHangul,
  containsStandardHangul,
} from './unicode/groups';
import assertChar from './assertChar';
import composeComplexGenerator from './composeComplex';
import composeSyllableGenerator from './composeSyllable';
import decomposeSyllable from './decomposeSyllable';
import fuel from './fuel';
import transform, { transformChar } from './transformer';

export function isComplex(char) {
  assertChar(char);
  return !!(transformChar(char).length - 1);
}
export const composeSyllable = fuel(composeSyllableGenerator);
export const composeComplex = fuel(composeComplexGenerator, true);
export {
  isSyllable,
  isHangul,
  isStandardHangul,
  isAllHangul,
  isAllStandardHangul,
  containsHangul,
  containsStandardHangul,
  isConsonant,
  isVowel,
  composeSyllableGenerator,
  decomposeSyllable,
  transform,
};
