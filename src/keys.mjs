import { hangulToKey, keyToHangul } from './unicode/characters';
import { assembleFactory } from './assemble';
import { noCompDouble } from './compose';
import { transformExceptCho } from './decomposeComplex';
import { disassembleFactory } from './disassemble';
import { Character, deepMap, deepFlatMap } from './types';

const hangulToKeyFn = char => hangulToKey[char] || char;
const keyToHangulFn = char => keyToHangul[char];
const transformToKeys = (hangulChar) => {
  const res = transformExceptCho(hangulChar);
  return Array.isArray(res) ? res.map(hangulToKeyFn) : hangulToKeyFn(res);
};
const disassembleToKeys = disassembleFactory(transformToKeys);
export const toKeys = (data, grouped) => (grouped ? deepMap : deepFlatMap)(data, disassembleToKeys);
const transformCharToHangul = (latinDatum) => {
  const latinChar = Character(latinDatum);
  const res = keyToHangulFn(latinChar);
  if (!res) {
    // couldn't find a key for that characters
    const lowerCaseRes = keyToHangulFn(latinChar.toLowerCase());
    if (!lowerCaseRes) {
      return latinChar;
    }
    return lowerCaseRes;
  }
  return res;
};
// it's okay that we're not standarizing because the data
// in hangulToKey is already standard :)
const transformToHangul = data => deepMap(data, transformCharToHangul);
const assembleFromKeys = assembleFactory(transformToHangul);
export const fromKeys = data => assembleFromKeys(data, noCompDouble);
