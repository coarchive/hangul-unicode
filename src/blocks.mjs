import Range from './Range';
import is from './is';

const jamo = new Range(0x1100, 0x11FF);
const compatibilityJamo = new Range(0x3130, 0x318F);
const jamoExtendedA = new Range(0xA960, 0xA97F);
const syllables = new Range(0xAC00, 0xD7AF);
const jamoExtendedB = new Range(0xD7B0, 0xD7FF);
const halfwidth = new Range(0xFFA0, 0xFFDF);
const isJamo = is(jamo);
const isCompatibilityJamo = is(compatibilityJamo);
const isJamoExtendedA = is(jamoExtendedA);
const isSyllable = is(syllables);
const isJamoExtendedB = is(jamoExtendedB);
const isHalfwidth = is(halfwidth);
export {
  jamo,
  compatibilityJamo,
  jamoExtendedA,
  syllables,
  jamoExtendedB,
  halfwidth,
  isJamo,
  isCompatibilityJamo,
  isJamoExtendedA,
  isSyllable,
  isJamoExtendedB,
  isHalfwidth,
};
