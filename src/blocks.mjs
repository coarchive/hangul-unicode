import Range from './Range';

export const jamo = new Range(0x1100, 0x11FF);
export const compatibilityJamo = new Range(0x3130, 0x318F);
export const jamoExtendedA = new Range(0xA960, 0xA97F);
export const syllables = new Range(0xAC00, 0xD7AF);
export const jamoExtendedB = new Range(0xD7B0, 0xD7FF);
export const halfwidth = new Range(0xFFA0, 0xFFDF);
