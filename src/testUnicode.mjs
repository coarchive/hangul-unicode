import * as blocks from './unicode/blocks';
import { isAll, contains } from './simpleDeepTest';
import name from './name';

export const isJamo = char => blocks.jamo.contains(char);
export const isCompatibilityJamo = char => blocks.compatibilityJamo.contains(char);
export const isJamoExtendedA = char => blocks.jamoExtendedA.char(char);
export const isSyllable = char => blocks.syllables.contains(char);
export const isJamoExtendedB = char => blocks.jamoExtendedB.contains(char);
export const isHalfwidth = char => blocks.halfwidth.contains(char);
export const isReserved = char => blocks.reserved.contains(char);
export const isStandardHangul = char => blocks.standardHangul.contains(char);
export const isHangul = char => blocks.hangul.contains(char);

const isAllJamo = isAll(isJamo);
export const containsJamo = contains(isJamo);

export const isAllCompatibilityJamo = isAll(isCompatibilityJamo);
export const containsCompatibilityJamo = contains(isCompatibilityJamo);

export const isAllJamoExtendedA = isAll(isJamoExtendedA);
export const containsJamoExtendedA = contains(isJamoExtendedA);

export const isAllSyllable = isAll(isSyllable);
export const containsSyllable = contains(isSyllable);

export const isAllJamoExtendedB = isAll(isJamoExtendedB);
export const containsJamoExtendedB = contains(isJamoExtendedB);

export const isAllHalfwidth = isAll(isHalfwidth);
export const containsHalfwidth = contains(isHalfwidth);

export const isAllReserved = isAll(isReserved);
export const containsReserved = contains(isReserved);

export const isAllStandardHangul = isAll(isStandardHangul);
export const containsStandardHangul = contains(isStandardHangul);

export const isAllHangul = isAll(isHangul);
export const containsHangul = contains(isHangul);
name({
  isJamo,
  isAllJamo,
  containsJamo,

  isCompatibilityJamo,
  isAllCompatibilityJamo,
  containsCompatibilityJamo,

  isJamoExtendedA,
  isAllJamoExtendedA,
  containsJamoExtendedA,

  isSyllable,
  isAllSyllable,
  containsSyllable,

  isJamoExtendedB,
  isAllJamoExtendedB,
  containsJamoExtendedB,

  isHalfwidth,
  isAllHalfwidth,
  containsHalfwidth,

  isStandardHangul,
  isAllStandardHangul,
  containsStandardHangul,

  isHangul,
  isAllHangul,
  containsHangul,
});
