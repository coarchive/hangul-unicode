import { syllables } from './unicode/blocks';
import { curriedDecomposeComplex_T } from './decomposeComplex';
import { splitSyllable_T } from './decomposeSyllable';
import { deepMap, deepFlatMap } from './deepMap';
import { Character } from './types';

export const disassembleFactory_U = transformer => (datum) => {
  const char = Character(datum);
  if (syllables.contains(char)) {
    return splitSyllable_T(char).map(transformer);
  }
  return transformer(char);
};
// not to be confused with Hangul.disassemble
// this disassemble takes Characters as inputs, not CharacterGroups
const disassembleCharacter_U = opts => opts
  |> curriedDecomposeComplex_T
  |> disassembleFactory_U;
export default ((data, opts) => data
  |> (
    disassembleCharacter_U(opts)
    |> (opts.grouped ? deepMap : deepFlatMap)
  )
);
