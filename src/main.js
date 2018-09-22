export assemble from './assemble';
export disassemble, { disassembleCharacter } from './disassemble';
// import name from './name';
export stronger from './stronger';
export decomposeComplex from './decomposeComplex';
export decomposeSyllable from './decomposeSyllable';
export standardize from './standardize';
export * from './keys';
export * from './testStrings';
export { complex as composeComplex, syllable as composeSyllable } from './publicCompose';
// TODO: Add smarter caching of function based on mode
// TODO: remove } if
