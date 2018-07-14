import * as blocks from './unicode/blocks';
import { contains, whatIs } from './array';

const isStandardHangul = char => blocks.isCompatibilityJamo(char) || blocks.isSyllable(char);
const isHangul = char => (
  isStandardHangul(char)
  || blocks.isJamo(char)
  || blocks.isJamoExtendedA(char)
  || blocks.isJamoExtendedB(char)
  || blocks.isHalfwidth(char)
);
const containsStandardHangul = contains(isStandardHangul);
const containsHangul = contains(isHangul);
const whatIsStandardHangul = whatIs(isStandardHangul);

export {
  isHangul,
  isStandardHangul,
  containsHangul,
  containsStandardHangul,
  whatIsStandardHangul,
};
