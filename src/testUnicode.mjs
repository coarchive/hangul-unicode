import * as blocks from './unicode/blocks';
import contains from './contains';
import is from './is';
import isAll from './isAll';
import name from './name';

const jamo = char => blocks.jamo.contains(char);
const compatibilityJamo = char => blocks.compatibilityJamo.contains(char);
const jamoExtendedA = char => blocks.jamoExtendedA.char(char);
const syllable = char => blocks.syllables.contains(char);
const jamoExtendedB = char => blocks.jamoExtendedB.contains(char);
const halfwidth = char => blocks.halfwidth.contains(char);
const reserved = char => blocks.reserved.contains(char);
const standardHangul = char => blocks.standardHangul.contains(char);
const hangul = char => blocks.hangul.contains(char);

export const isJamo = is(jamo);
export const isJamoAll = isAll(syllable);
export const containsJamo = contains(syllable);
export const isCompatibilityJamo = is(compatibilityJamo);
export const isCompatibilityJamoAll = isAll(compatibilityJamo);
export const containsCompatibilityJamo = contains(compatibilityJamo);
export const isJamoExtendedA = is(jamoExtendedA);
export const isJamoExtendedAAll = isAll(jamoExtendedA);
export const containsJamoExtendedA = contains(jamoExtendedA);
export const isSyllable = is(syllable);
export const isSyllableAll = isAll(syllable);
export const containsSyllable = contains(syllable);
export const isJamoExtendedB = is(jamoExtendedB);
export const isJamoExtendedBAll = isAll(jamoExtendedB);
export const containsJamoExtendedB = contains(jamoExtendedB);
export const isHalfwidth = is(halfwidth);
export const isHalfwidthAll = isAll(halfwidth);
export const containsHalfwidth = contains(halfwidth);
export const isReserved = is(reserved);
export const isReservedAll = isAll(reserved);
export const containsReserved = contains(reserved);
export const isStandardHangul = is(standardHangul);
export const isStandardHangulAll = isAll(standardHangul);
export const containsStandardHangul = contains(standardHangul);
export const isHangul = is(hangul);
export const isHangulAll = isAll(hangul);
export const containsHangul = contains(hangul);
name({
  isSyllable,
  isSyllableAll,
  containsSyllable,
});
