import * as blocks from './blocks';

const is = range => (char) => {
  if (char.length - 1) {
    throw new Error(`"${char}" does not have a length of one!`);
  }
  return range.contains(char.charCodeAt(0));
};
const isJamo = is(blocks.jamo);
const isCompatibilityJamo = is(blocks.compatibilityJamo);
const isJamoExtendedA = is(blocks.jamoExtendedA);
const isSyllable = is(blocks.syllables);
const isJamoExtendedB = is(blocks.jamoExtendedB);
const isHalfwidth = is(blocks.halfwidth);

const isJamoExtended = v => isJamoExtendedA(v) || isJamoExtendedB(v);
const isStandard = v => isCompatibilityJamo(v) || isSyllable(v);
const isHangul = v => isJamo(v) || isStandard(v) || isJamoExtended(v) || isHalfwidth(v);
export {
  isJamo,
  isCompatibilityJamo,
  isJamoExtendedA,
  isSyllable,
  isJamoExtendedB,
  isHalfwidth,
  isJamoExtended,
  isStandard,
  isHangul,
};
