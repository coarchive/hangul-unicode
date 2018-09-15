import { hangulToKey, keyToHangul } from './unicode/characters';
import { assembleFactory_g_T } from './assemble';
import { transformLeavingCho_T } from './decomposeComplex';
import { publicMap } from './deepMap';
import { disassembleFactory_U } from './disassemble';
import { Character, isCharacterGroup, toArray } from './types';
// hangul to keystrokes

const hangulToKeyFn = char => hangulToKey[char] || char;
const transformToKeys_T = (hangulChar) => {
  const res = transformLeavingCho_T(hangulChar);
  return do {
    if (isCharacterGroup(res)) {
      toArray(res).map(hangulToKeyFn);
    } else {
      hangulToKeyFn(res);
    }
  };
};
export const disassembleToKeys = disassembleFactory_U(transformToKeys_T) |> publicMap;
// _g_U

// keystrokes to hangul
const keyToHangulFn = char => keyToHangul[char];
const transformToHangul_U = (latinDatum) => {
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
const assembler = assembleFactory_g_T(transformToHangul_U);
export const keysToHangul = (data, opts) => data |> assembler(opts);
// it's okay that we're not standarizing because the data
// in hangulToKey is already standard :)
