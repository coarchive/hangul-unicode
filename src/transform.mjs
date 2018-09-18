// tries to transform everything into disassembled standard hangul
// it ignores syllables though
import { standardHangul } from './unicode/blocks';
import { pairs } from './unicode/complex';
import mappings from './unicode/mappings';
import { character } from './types';

export const transformNonStandard_T = char => (!standardHangul.contains_T(char) && mappings[char]) || char;
export const transformNonStandard_U = datum => datum
  |> character
  |> transformNonStandard_T;
export const transform_T = char => (
  (standardHangul.contains_T(char) ? pairs : mappings)[char]
  || char
);
export const transform_U = datum => datum
  |> character
  |> transform_T;
// transform everything just means that it also transforms
// standard hangul characters instead of ignoring them
