// tries to transform everything into disassembled standard hangul
// it ignores syllables though
import { standardHangul } from './unicode/blocks';
import { pairs } from './unicode/complex';
import mappings from './unicode/mappings';
import { deepMap } from './types';

export const transform = (char => (!standardHangul.contains(char) && mappings[char]) || char);
export const transformAll = char => (standardHangul.contains(char) ? pairs : mappings)[char] || char;
export const transformGroup = group => group.map();
// transformCharacter: T:>Character => CharacterGroup
