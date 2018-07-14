import * as blocks from './unicode/blocks';
import { contains } from './array';

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

export {
  isHangul,
  isStandardHangul,
  containsHangul,
  containsStandardHangul,
};
