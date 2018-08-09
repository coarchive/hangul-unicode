import { syllables } from './unicode/blocks';
import { transformEverything } from './transform';
import decomposeSyllable from './decomposeSyllable';
import { deepMap, deepFlatMap } from './types';

function disassembleCharacter(char) {
  let res;
  if (syllables.contains(char)) {
    res = decomposeSyllable(char).map(transformEverything);
    // that .map(transformEverything) catches the complex
    // characters that decomposeSyllable returns
  } else {
    res = transformEverything(char);
  }
  if (Array.isArray(res)) {
    // res SHOULD only be an array of characters
    // so there's no need to worry about .join('')
    // leaving residue commas behind or something
    res = res.join('');
  }
  return res;
}
export default ((data, grouped) => (grouped ? deepMap : deepFlatMap)(data, disassembleCharacter));
// this is a shady function, it calls either deepMap or
// deepFlatMap with the data and disassembleCharacter
