import Range from './Range';
import { is } from '../array';

console.log(is);
export const jamo = new Range(0x1100, 0x11FF);
export const compatibilityJamo = new Range(0x3130, 0x318F);
export const jamoExtendedA = new Range(0xA960, 0xA97F);
export const syllables = new Range(0xAC00, 0xD7AF);
export const jamoExtendedB = new Range(0xD7B0, 0xD7FF);
export const halfwidth = new Range(0xFFA0, 0xFFDF);
export const isJamo = is(jamo);
export const isCompatibilityJamo = is(compatibilityJamo);
export const isJamoExtendedA = is(jamoExtendedA);
export const isSyllable = is(syllables);
export const isJamoExtendedB = is(jamoExtendedB);
export const isHalfwidth = is(halfwidth);