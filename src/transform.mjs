// tries to transform everything into disassembled standard hangul
// it ignores syllables though
import { standardHangul } from './unicode/blocks';
import { pairs } from './unicode/complex';
import mappings from './unicode/mappings';
import { Character } from './types';

export const transformChar = char => (!standardHangul.contains(char) && mappings[char]) || char;
export const transformDatum = datum => transformChar(Character(datum));
export const transformEveryChar = char => (
  (standardHangul.contains(char) ? pairs : mappings)[char]
  || char
);
export const transformEveryDatum = datum => transformEveryChar(Character(datum));
// transform everything just means that it also transforms
// standard hangul characters instead of ignoring them
