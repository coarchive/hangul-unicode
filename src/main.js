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
import composeComplex from './composeComplex';
import composeSyllable from './composeSyllable';
import decomposeSyllable from './decomposeSyllable';
import transform, { transformChar } from './transformer';

function isComplex(char) {
  assertChar(char);
  return !!(transformChar(char).length - 1);
}
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
  isComplex,
  composeComplex,
  composeSyllable,
  decomposeSyllable,
  transform,
};
