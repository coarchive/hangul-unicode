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
export { default as toStandard, standardizeCharacter as toStandardCharacter } from './standardize';
export { default as stronger } from './stronger';
export { deepFlatMap } from './types';
export * from './transform';
// ᆋ
export * from './testConsonant';
export * from './testVowel';
// export * from './testSyllable';
export * from './unicode/blocks';
// TODO: public unicode block testing
// TODO: toKeys fromKeys
