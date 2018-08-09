import { syllables } from './unicode/blocks';
import { transformEverything } from './transform';
import decomposeSyllable from './decomposeSyllable';
import { deepMap, deepFlatMap } from './types';

function disassembleCharacter(char) {
  console.log(char);
  let res;
  if (syllables.contains(char)) {
    res = decomposeSyllable(char).map(transformEverything);
    // that .map(transformEverything) catches the complex
    // characters that decomposeSyllable returns
  } else {
    res = transformEverything(char);
  }
  return res;
}
export default ((data, grouped) => (grouped ? deepMap : deepFlatMap)(data, disassembleCharacter));
// this is a shady function, it calls either deepMap or
// deepFlatMap with the data and disassembleCharacter
