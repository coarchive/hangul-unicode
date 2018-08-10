import { syllables } from './unicode/blocks';
import { transformCharacter, transformEverything } from './transform';
import decomposeSyllable from './decomposeSyllable';
import { deepMap, deepFlatMap } from './types';

function disassembleEveryCharacter(char) {
  if (syllables.contains(char)) {
    return decomposeSyllable(char).map(transformEverything);
    // that .map(transformEverything) catches the complex
    // characters that decomposeSyllable returns
  }
  // otherwise try breaking complex characters apart
  return transformEverything(char);
}
function disassembleCharacter(char) {
  if (syllables.contains(char)) {
    return decomposeSyllable(char).map(transformCharacter);
    // that .map(transformEverything) catches the complex
    // characters that decomposeSyllable returns
  }
  // otherwise try breaking complex characters apart
  return transformCharacter(char);
}
export default ((data, grouped, disassembleDouble) => (grouped ? deepMap : deepFlatMap)(data, disassembleDouble ? disassembleEveryCharacter : disassembleCharacter));
// I know this looks really bad since it's all on
// one line but ESlint was being really finicky
