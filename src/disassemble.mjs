import { syllables } from './unicode/blocks';
import { transformLeavingCho } from './decomposeComplex';
import { trustMe } from './decomposeSyllable';
import { deepMap, deepFlatMap } from './deepMap';
import { transformEveryChar } from './transform';
import { Character, flatten } from './types';

export const disassembleFactory = transformer => (datum) => {
  const char = Character(datum);
  if (syllables.contains(char)) {
    return trustMe(char).map(transformer);
  }
  return transformer(char);
};
// not to be confused with Hangul.disassemble
// this disassemble takes Characters as inputs, not CharacterGroups
export const disassembleCharacter = (mode) => {
  const dT = disassembleFactory(
    mode.decomposeComplexDouble
      ? transformEveryChar
      : transformLeavingCho, // eww, trailing comma here, eslint?
  );
  return (datum) => {
    const res = datum |> dT;
    if (!mode.grouped) {
      return flatten(res);
    }
    return res;
  };
};
export default (data, mode) => data
  |> (
    disassembleCharacter(mode)
    |> (mode.grouped ? deepMap : deepFlatMap)
  );
// it looks fine if you don't look at the parens in detail
