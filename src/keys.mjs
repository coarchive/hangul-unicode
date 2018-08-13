import { hangulToKey, keyToHangul } from './unicode/characters';
import { transformExceptDoubles } from './decomposeComplex';
import { disassembleFactory } from './disassemble';
import { Character, deepMap, deepFlatMap } from './types';
import { assembleFactory } from './assemble';

const hangulToKeyFn = char => hangulToKey[char];
const keyToHangulFn = char => keyToHangul[char] || char;
const transformToKeys = (hangulChar) => {
  const res = transformExceptDoubles(hangulChar);
  return Array.isArray(res) ? res.map(hangulToKeyFn) : hangulToKeyFn(res);
};
const disassembleToKeys = disassembleFactory(transformToKeys);
export const toKeys = (data, grouped) => (grouped ? deepMap : deepFlatMap)(data, disassembleToKeys);
const transformCharToHangul = (latinDatum) => {
  console.error('ASKDLJASKJDhADSILhZDS');
  const latinChar = Character(latinDatum);
  const res = keyToHangulFn(latinChar);
  if (!res) {
    // couldn't find a key for that characters
    const lowerCaseRes = hangulToKeyFn(latinChar.toLowerCase());
    if (!lowerCaseRes) {
      console.log({ latinChar });
      return latinChar;
    }
    console.log({ lowerCaseRes });
    return lowerCaseRes;
  }
  console.log({ res });
  return res;
};
// it's okay that we're not standarizing because the data
// in hangulToKey is already standard :)
const transformToHangul = data => deepMap(data, transformCharToHangul);
export const fromKeys = assembleFactory(transformToHangul);
