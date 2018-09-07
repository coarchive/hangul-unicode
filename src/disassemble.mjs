import { syllables } from './unicode/blocks';
import { transformExceptCho } from './decomposeComplex';
import { trustMe } from './decomposeSyllable';
import { transformEveryChar } from './transform';
import {
  Character, deepMap, deepFlatMap, flatten,
} from './types';

export const disassembleFactory = transformer => (datum) => {
  const char = Character(datum);
  if (syllables.contains(char)) {
    return trustMe(char).map(transformer);
    // that .map(transformEverything) catches the complex
    // characters that decomposeSyllable returns
  }
  // otherwise try breaking complex characters apart
  return transformer(char);
};
const disassembleAll = disassembleFactory(transformEveryChar);
const disassemble = disassembleFactory(transformExceptCho);
// not to be confused with Hangul.disassemble
// this disassemble takes Characters as inputs, not CharacterGroups
export const disassembleCharacter = (datum, grouped, mode) => {
  const res = datum |> (decomposeDoubles ? disassembleAll : disassemble);
  if (!grouped) {
    return flatten(res);
  }
  return res;
};
export default (data, grouped, mode) => (grouped ? deepMap : deepFlatMap)(data, decomposeDoubles ? disassembleAll : disassemble, true);
// I know this looks really bad since it's all on
// one line but ESlint was being really finicky
