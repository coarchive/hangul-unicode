// tries to transform everything into disassembled standard hangul
// it ignores syllables though
import { standardHangul } from './unicode/blocks';
import { pairs } from './unicode/complex';
import mappings from './unicode/mappings';

export default (char => (!standardHangul.contains(char) && mappings[char]) || char);
export const transformEverything = char => (standardHangul.contains(char) ? pairs : mappings)[char] || char;
// transformCharacter: T:>Character => CharacterGroup
