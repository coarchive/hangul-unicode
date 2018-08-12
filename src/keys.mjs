import { hangulToKey, keyToHangul } from './unicode/characters';
import disassemble from './disassemble';
import { flatten, deepMap, deepFlatMap } from './types';

export const fromKeys = data => deepFlatMap();
const hangulToKeyFn = char => hangulToKey[char] || char;
// TODO: toKeys(data, true) outputs wrong stuff on depth 2
export const toKeys = (data, grouped) => (grouped ? deepMap : deepFlatMap)(disassemble(flatten(data), grouped), hangulToKeyFn);
