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
import {
  cho,
  jung,
  jong,
  irregular
} from './unicode/complex';
import composeComplexGenerator from './composeComplex';
import composeSyllableGenerator from './composeSyllable';
import decomposeSyllable from './decomposeSyllable';
import fuel from './fuel';
import transform from './transformer';
import toStandard from './toStandard';
import composeAnyComplex from './composeAnyComplex';

export const composeSyllable = fuel(composeSyllableGenerator);
export const composeComplex = fuel(composeComplexGenerator, cho, jung, jong, irregular);
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
  composeComplexGenerator,
  decomposeSyllable,
  transform,
  toStandard,
  fuel,
  composeAnyComplex,
};
