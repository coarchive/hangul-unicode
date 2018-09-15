import { syllables } from './unicode/blocks';
import { curriedDecomposeComplex_T } from './decomposeComplex';
import { splitSyllable_T } from './decomposeSyllable';
import { publicMap } from './deepMap';
import { Character } from './types';

const disassembleFactory_T = transformer => (char) => {
  if (syllables.contains(char)) {
    return splitSyllable_T(char).map(transformer);
  }
  return transformer(char);
};
// not to be confused with Hangul.disassemble
// this disassemble takes Characters as inputs, not CharacterGroups
const disassembleCharacter_T = opts => opts
  |> curriedDecomposeComplex_T
  |> disassembleFactory_T;
export default ((data, opts) => );
// it looks fine if you don't look at the parens in detail
