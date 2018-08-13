import assemble from './assemble';
import disassemble, { disassembleChar } from './disassemble';


export { default as composeAnything } from './compose';
export { default as decomposeComplex } from './decomposeComplex';
export { default as decomposeSyllable } from './decomposeSyllable';
export { complex as composeComplex, syllable as composeSyllable } from './publicCompose';
export { default as standardize, standardizeCharacterBase } from './standardize';
export { default as stronger } from './stronger';
export { flatten, deepMap } from './types';
export {
  assemble,
  assemble as a,
  disassemble,
  disassemble as d,
  disassembleChar as disassembleCharacter,
};
export * from './keys';
export * from './testConsonant';
export * from './testUnicode';
export * from './testVowel';
// TODO: write tests
// TODO: is irregular complex
