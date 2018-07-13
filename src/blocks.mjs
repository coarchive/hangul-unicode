import Range from './Range';

const is = range => (char) => {
  if (char.length - 1) {
    throw new Error(`"${char}" does not have a length of one!`);
  }
  return range.contains(char.charCodeAt(0));
};
export const jamo = new Range(0x1100, 0x11FF);
export const compatibilityJamo = new Range(0x3130, 0x318F);
export const jamoExtendedA = new Range(0xA960, 0xA97F);
export const syllables = new Range(0xAC00, 0xD7AF);
export const jamoExtendedB = new Range(0xD7B0, 0xD7FF);
export const halfwidth = new Range(0xFFA0, 0xFFDF);

const isJamo = is(jamo);
const isCompatibilityJamo = is(compatibilityJamo);
const isJamoExtendedA = is(jamoExtendedA);
const isSyllable = is(syllables);
const isJamoExtendedB = is(jamoExtendedB);
const isHalfwidth = is(halfwidth);

export const isJamoExtended = v => isJamoExtendedA(v) || isJamoExtendedB(v);
export const isStandard = v => isCompatibilityJamo(v) || isSyllable(v);
export const isHangul = v => isJamo(v) || isStandard(v) || isJamoExtended(v) || isHalfwidth(v);

export {
  isJamo,
  isCompatibilityJamo,
  isJamoExtendedA,
  isSyllable,
  isJamoExtendedB,
  isHalfwidth,
};
