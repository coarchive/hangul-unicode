import { syllables } from './unicode/blocks';
import { transformEverything } from './transform';
import decomposeSyllable from './decomposeSyllable';
import { deepMap, deepFlatMap } from './types';

function disassembleCharacter(char) {
  let res;
  if (syllables.contains(char)) {
    res = decomposeSyllable(char);
  }
  res = transformEverything(char);
  if (Array.isArray(res)) {
    res = res.join('');
  }
  return res;
}
export default ((data, grouped) => (grouped ? deepMap : deepFlatMap)(data, disassembleCharacter));
