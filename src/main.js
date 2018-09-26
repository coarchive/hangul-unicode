import assemble from './assemble';
import disassemble, { disassembleCharacter } from './disassemble';
import { hangulToKeys, keysToHangul } from './keys';
import name from './name';
import standardize from './standardize';
import stronger from './stronger';

export decomposeComplex from './decomposeComplex';
export decomposeSyllable from './decomposeSyllable';
export * from './testStrings';
export { complex as composeComplex, syllable as composeSyllable } from './publicCompose';

name({
  assemble,
  hangulToKeys,
  keysToHangul,
  disassemble,
  standardize,
  stronger,
});
export {
  assemble as a,
  assemble,
  disassemble,
  disassemble as d,
  disassembleCharacter,
  hangulToKeys,
  keysToHangul,
  standardize,
  stronger,
};
// TODO: Add smarter caching of function based on mode
// TODO: remove } if
// const testCompression = (str) => Hangul.keysToHangul(str).length / str.length
