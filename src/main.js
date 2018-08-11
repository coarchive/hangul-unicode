import assemble from './assemble';
import disassemble from './disassemble';

export {
  assemble,
  assemble as a,
};
export {
  disassemble,
  disassemble as d,
};
export { default as decomposeComplex } from './decomposeComplex';
export { default as decomposeSyllable } from './decomposeSyllable';
export { complex as composeComplex, syllable as composeSyllable } from './publicCompose';
export { default as standardizeAll, standardizeCharacter } from './standardize';
export { default as stronger } from './stronger';
export { flatten } from './types';
export { toKeys } from './keys';
export * from './transform';
// ᆋ
export * from './testConsonant';
export * from './testVowel';
export * from './testUnicode';
// TODO: toKeys fromKeys
