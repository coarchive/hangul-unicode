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
export { deepFlatMap } from './types';
export { default as decomposeSyllable } from './decomposeSyllable';
export { complex as composeComplex, syllable as composeSyllable } from './publicCompose';
export { default as toStandard, standardizeCharacter as toStandardCharacter } from './standardize';
export { default as stronger } from './stronger';
export { default as decomposeComplex } from './decomposeComplex';
// ᆋ
