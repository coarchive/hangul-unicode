import { syllables } from './unicode/blocks';
import { chooseTransformer } from './decomposeComplex';
import { splitSyllable_T } from './decomposeSyllable';
import { generalMap } from './map';
import { character } from './types';
import computeOpts from './options';

export const disassembleCharacter_T = opts => (char) => {
  const t = chooseTransformer(opts);
  if (syllables.contains_T(char)) {
    return splitSyllable_T(char).map(t);
  }
  return t(char);
};
export const disassembleCharacter = (datum, opts) => datum
  |> character
  |> disassembleCharacter_T(opts |> computeOpts);
// not to be confused with Hangul.disassemble
// this disassemble takes Characters as inputs, not CharacterGroups
export default ((data, opts) => {
  const compOpts = computeOpts(opts);
  return generalMap(compOpts |> disassembleCharacter_T, compOpts, data);
});
