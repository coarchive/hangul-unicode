import { hangulToKey, keyToHangul } from './unicode/characters';
import { transformExceptDoubles } from './decomposeComplex';
import { disassembleFactory } from './disassemble';
import { deepMap, deepFlatMap } from './types';

export const fromKeys = data => deepFlatMap();
const hangulToKeyFn = char => hangulToKey[char] || char;
const transformToKeys = (char) => {
  const res = transformExceptDoubles(char);
  return Array.isArray(res) ? res.map(hangulToKeyFn) : hangulToKeyFn(res);
};
const disassembleToKeys = disassembleFactory(transformToKeys);
// TODO: toKeys(data, true) outputs wrong stuff on depth 2
export const toKeys = (data, grouped) => (grouped ? deepMap : deepFlatMap)(data, disassembleToKeys);
