// tries to transform everything into disassembled standard hangul
// it ignores syllables though
import { standardHangul } from './unicode/blocks';
import { pairs } from './unicode/complex';
import mappings from './unicode/mappings';
import { Character } from './types';

export const transformNonStandard_T = char => (!standardHangul.contains(char) && mappings[char]) || char;
export const transformNonStandard_U = datum => datum
  |> Character
  |> transformNonStandard_T;
export const transform_T = char => (
  (standardHangul.contains(char) ? pairs : mappings)[char]
  || char
);
export const transform_U = datum => datum
  |> Character
  |> transform_T;
// transform everything just means that it also transforms
// standard hangul characters instead of ignoring them
