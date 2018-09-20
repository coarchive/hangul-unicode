export assemble from './assemble';
export disassemble, { disassembleCharacter } from './disassemble';
// import name from './name';
export { composeComplex_T } from './compose';
// export stronger from './stronger';
export { default as decomposeComplex } from './decomposeComplex';
export { default as decomposeSyllable } from './decomposeSyllable';
// export { default as standardize } from './standardize';
export * from './keys';
export * from './testStrings';
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
