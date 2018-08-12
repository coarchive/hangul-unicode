import * as blocks from './unicode/blocks';
import { isAll, contains } from './simpleDeepTest';
import name from './name';
import { Character } from './types';

export const isJamo = data => blocks.jamo.contains(Character(data));
export const isCompatibilityJamo = data => blocks.compatibilityJamo.contains(Character(data));
export const isJamoExtendedA = data => blocks.jamoExtendedA.char(Character(data));
export const isSyllable = data => blocks.syllables.contains(Character(data));
export const isJamoExtendedB = data => blocks.jamoExtendedB.contains(Character(data));
export const isHalfwidth = data => blocks.halfwidth.contains(Character(data));
export const isReserved = data => blocks.reserved.contains(Character(data));
export const isStandardHangul = data => blocks.standardHangul.contains(Character(data));
export const isHangul = data => blocks.hangul.contains(Character(data));

export const isAllJamo = isAll(isJamo);
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
