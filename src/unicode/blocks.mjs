import UnicodeRange, { CombinedRange } from './UnicodeRange';

export const jamo = new UnicodeRange(0x1100, 0x11FF);
export const compatibilityJamo = new UnicodeRange(0x3130, 0x318F);
export const jamoExtendedA = new UnicodeRange(0xA960, 0xA97F);
export const syllables = new UnicodeRange(0xAC00, 0xD7AF);
export const jamoExtendedB = new UnicodeRange(0xD7B0, 0xD7FF);
export const halfwidth = new UnicodeRange(0xFFA0, 0xFFDF);
/*
{
  jamo,
  compatibilityJamo,
  jamoExtendedA,
  syllables,
  jamoExtendedB,
  halfwidth,
  reserved
} @Range
*/
export const reserved = new CombinedRange([
  new UnicodeRange(0xA97D, 0xA97F), // jamoExtendedA
  new UnicodeRange(0xD7A4, 0xD7AF), // syllables
  new UnicodeRange(0xD7C7, 0xD7CA), // jamoExtendedB
  new UnicodeRange(0xD7FC, 0xD7FF), // jamoExtendedB
], { 0x3130: 1, 0x318F: 1 });
export const standardHangul = new CombinedRange([compatibilityJamo, syllables]);
export const hangul = new CombinedRange([
  jamo,
  compatibilityJamo,
  jamoExtendedA,
  syllables,
  jamoExtendedB,
  halfwidth,
  reserved,
]);
// { reserved, standardHangul, hangul } @CombinedRange
