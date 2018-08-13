import * as blocks from './unicode/blocks';
import name from './name';
import { isAll, contains } from './simpleDeepTest';
import { Character } from './types';

export const isJamo = datum => blocks.jamo.contains(Character(datum));
export const isCompatibilityJamo = datum => blocks.compatibilityJamo.contains(Character(datum));
export const isJamoExtendedA = datum => blocks.jamoExtendedA.char(Character(datum));
export const isSyllable = datum => blocks.syllables.contains(Character(datum));
export const isJamoExtendedB = datum => blocks.jamoExtendedB.contains(Character(datum));
export const isHalfwidth = datum => blocks.halfwidth.contains(Character(datum));
export const isReserved = datum => blocks.reserved.contains(Character(datum));
export const isStandardHangul = datum => blocks.standardHangul.contains(Character(datum));
export const isHangul = datum => blocks.hangul.contains(Character(datum));

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

  isReserved,
  isAllReserved,
  containsReserved,

  isStandardHangul,
  isAllStandardHangul,
  containsStandardHangul,

  isHangul,
  isAllHangul,
  containsHangul,
});
