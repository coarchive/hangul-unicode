import assemble from './assemble';
import disassemble, { disassembleCharacter } from './disassemble';
import name from './name';
import { complex as composeComplex, syllable as composeSyllable } from './publicCompose';
import stronger from './stronger';

name({
  assemble,

  disassemble,
  disassembleCharacter,

  composeComplex,
  composeSyllable,

  stronger,
});
export { default as decomposeComplex } from './decomposeComplex';
export { default as decomposeSyllable } from './decomposeSyllable';
export * from './mode';
export { default as standardize } from './standardize';
export { flatten, deepMap } from './types';
export * from './keys';
export * from './test';
export {
  assemble,
  assemble as a,

  disassemble,
  disassemble as d,
  disassembleCharacter,

  composeComplex,
  composeSyllable,

  stronger,
};
