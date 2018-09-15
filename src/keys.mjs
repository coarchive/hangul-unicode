import { hangulToKey, keyToHangul } from './unicode/characters';
import { assembleFactory } from './assemble';
import { transformLeavingCho_U } from './decomposeComplex';
import { deepMap, deepFlatMap } from './deepMap';
import { disassembleFactory } from './disassemble';
import { Character, isCharacterGroup, toArray } from './types';
// hangul to keystrokes

const hangulToKeyFn = char => hangulToKey[char] || char;
const transformToKeys_U = (hangulChar) => {
  const res = transformLeavingCho_U(hangulChar);
  return do {
    if (isCharacterGroup(res)) {
      toArray(res).map(hangulToKeyFn);
    } else {
      hangulToKeyFn(res);
    }
  };
};
const disassembleToKeys = disassembleFactory(transformToKeys_U);
const groupedDisassembleToKeys = deepMap(disassembleToKeys);
const flatDisassembleToKeys = deepFlatMap(disassembleToKeys);
export const hangulToKeys = (data, opts = {}) => data
  |> (opts.grouped ? groupedDisassembleToKeys : flatDisassembleToKeys);
// TODO: types needs to have a "generalDeepMap" which
// generalDeepMap: fn => opts => data

// keystrokes to hangul
const keyToHangulFn = char => keyToHangul[char];
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
const transformToHangul = deepMap(transformCharToHangul);
const assembleFromKeys = assembleFactory(transformToHangul);
export const keysToHangul = assembleFromKeys();
// it's okay that we're not standarizing because the data
// in hangulToKey is already standard :)
