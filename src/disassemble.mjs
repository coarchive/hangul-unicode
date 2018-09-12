import { syllables } from './unicode/blocks';
import { transformLeavingCho } from './decomposeComplex';
import { trustMe } from './decomposeSyllable';
import { transformEveryChar } from './transform';
import {
  Character, deepMap, deepFlatMap, flatten,
} from './types';

export const disassembleThingy = (mode) => {
  const transformer = mode.decomposeComplexDouble ? transformEveryChar : transformLeavingCho;
  return (datum) => {
    const char = Character(datum);
    if (syllables.contains(char)) {
      return trustMe(char).map(transformer);
    }
    return transformer(char);
  };
};
// not to be confused with Hangul.disassemble
// this disassemble takes Characters as inputs, not CharacterGroups
export const disassembleCharacter = (mode) => {
  const dT = disassembleThingy(mode);
  return (datum) => {
    const res = datum |> dT;
    if (!mode.grouped) {
      return flatten(res);
    }
    return res;
  };
};
export default (data, mode) => (grouped ? deepMap : deepFlatMap)(data, disassembleCharacter(mode));
// I know this looks really bad since it's all on
// one line but ESlint was being really finicky
