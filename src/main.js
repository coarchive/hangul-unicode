import assemble from './assemble';
import disassemble, { disassembleCharacter } from './disassemble';
import { hangulToKeys, keysToHangul } from './keys';
import name from './name';

export stronger from './stronger';
export decomposeComplex from './decomposeComplex';
export decomposeSyllable from './decomposeSyllable';
export standardize from './standardize';
export * from './testStrings';
export { complex as composeComplex, syllable as composeSyllable } from './publicCompose';

name({
  assemble,
  hangulToKeys,
  keysToHangul,
  disassemble,
});
export {
  assemble,
  hangulToKeys,
  keysToHangul,
  disassemble,
  disassembleCharacter,
};
// TODO: Add smarter caching of function based on mode
// TODO: remove } if
