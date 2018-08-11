import { hangulToKey, keyToHangul } from './unicode/characters';
import disassemble from './disassemble';
import { flatten, deepMap, deepFlatMap } from './types';

export const fromKeys = 1;
const hangulToKeyFn = char => hangulToKey[char] || char;
export const toKeys = (data, grouped) => (grouped ? deepMap : deepFlatMap)(disassemble(flatten(data), grouped), hangulToKeyFn);
