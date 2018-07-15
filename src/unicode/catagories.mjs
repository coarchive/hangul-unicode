import * as blocks from './blocks';
import { contains, isAll } from '../array';

export const isStandardHangul = char => blocks.isCompatibilityJamo(char) || blocks.isSyllable(char);
export const isHangul = char => (
  isStandardHangul(char)
  || blocks.isJamo(char)
  || blocks.isJamoExtendedA(char)
  || blocks.isJamoExtendedB(char)
  || blocks.isHalfwidth(char)
);
export const isAllHangul = isAll(isHangul);
export const isAllStandardHangul = isAll(isStandardHangul);
export const containsStandardHangul = contains(isStandardHangul);
export const containsHangul = contains(isHangul);
