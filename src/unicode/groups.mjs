import * as blocks from './blocks';

export const isStandardHangul = char => blocks.isCompatibilityJamo(char) || blocks.isSyllable(char);
export const isHangul = char => (
  isStandardHangul(char)
  || blocks.isJamo(char)
  || blocks.isJamoExtendedA(char)
  || blocks.isJamoExtendedB(char)
  || blocks.isHalfwidth(char)
);
