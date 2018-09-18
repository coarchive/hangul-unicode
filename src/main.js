export assemble from './assemble';
export disassemble, { disassembleCharacter } from './disassemble';
// import name from './name';
// import { complex as composeComplex, syllable as composeSyllable } from './publicCompose';
// import stronger from './stronger';
/*
name({
  assemble,

  disassemble,
  disassembleCharacter: disassembleCharacter_U,

  composeComplex,
  composeSyllable,

  stronger,
});
*/
export { default as decomposeComplex } from './decomposeComplex';
export { default as decomposeSyllable } from './decomposeSyllable';
// export { default as standardize } from './standardize';
export * from './keys';
// export * from './testStrings';
/*
export {
  assemble,
  assemble as a,

  disassemble,
  disassemble as d,
  disassembleCharacter_U,

  composeComplex,
  composeSyllable,

  stronger,
};
*/
// TODO: Add smarter caching of function based on mode
// TODO: remove } if
