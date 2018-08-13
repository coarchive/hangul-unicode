import assemble from './assemble';
import disassemble, { disassembleChar } from './disassemble';

export {
  assemble,
  assemble as a,
};
export {
  disassemble,
  disassemble as d,
  disassembleChar as disassembleCharacter,
};
export { default as composeAnything } from './compose';
export { default as decomposeComplex } from './decomposeComplex';
export { default as decomposeSyllable } from './decomposeSyllable';
export { complex as composeComplex, syllable as composeSyllable } from './publicCompose';
export { default as standardize, standardizeCharacterBase } from './standardize';
export { default as stronger } from './stronger';
export { flatten, deepMap } from './types';
export * from './keys';
export * from './transform';
export * from './testConsonant';
export * from './testVowel';
export * from './testUnicode';
// TODO: toKeys fromKeys
// TODO: public character checking is not working!
// TODO: toKeys(data, true) is outputting wrong things!
// TODO: write jest tests
// TODO: why is to keys still not working what the fucASKLJDlkdaSlksaJDlkasd;aKJSDHSH ♋
// TODO: is irregular complex
