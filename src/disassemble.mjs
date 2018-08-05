import { syllables } from './unicode/blocks';
import { transformEverything } from './transform';
import decomposeSyllable from './decomposeSyllable';
import { deepMap, deepFlatMap } from './types';

function disassembleCharacter(char) {
  if (syllables.contains(char)) {
    return decomposeSyllable(char);
  }
  return transformEverything(char);
}
export default ((data, grouped) => (grouped ? deepMap : deepFlatMap)(data, disassembleCharacter));
// default: UP:>CharacterGroup => TP:>Boolean => TP:>Boolean => CharacterGroup
