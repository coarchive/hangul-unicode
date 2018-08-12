import { syllables } from './unicode/blocks';
import { transformEverything } from './transform';
import { transformExceptDoubles } from './decomposeComplex';
import { trustMe } from './decomposeSyllable';
import { Character, deepMap, deepFlatMap } from './types';

const disassembleFactory = transformer => (val) => {
  const char = Character(val);
  if (syllables.contains(char)) {
    return trustMe(char).map(transformer);
    // that .map(transformEverything) catches the complex
    // characters that decomposeSyllable returns
  }
  // otherwise try breaking complex characters apart
  return transformer(char);
};
const disassembleAll = disassembleFactory(transformEverything);
const disassemble = disassembleFactory(transformExceptDoubles);
// not to be confused with Hangul.disassemble
// this disassemble takes Characters as inputs, not CharacterGroups
export default ((data, grouped, decomposeDoubles) => (grouped ? deepMap : deepFlatMap)(data, decomposeDoubles ? disassembleAll : disassemble));
// I know this looks really bad since it's all on
// one line but ESlint was being really finicky
