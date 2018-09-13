import { hangulToKey, keyToHangul } from './unicode/characters';
import { assembleFactory } from './assemble';
import { transformLeavingCho } from './decomposeComplex';
import { disassembleFactory } from './disassemble';
import {
  Character,
  deepMap,
  deepFlatMap,
  isCharacterGroup,
} from './types';

// hangul to keystrokes
const hangulToKeyFn = char => hangulToKey[char] || char;
const transformToKeys = (hangulChar) => {
  const res = transformLeavingCho(hangulChar);
  return do {
    if (isCharacterGroup(res)) {
      res.split('').map(hangulToKeyFn);
    } else {
      hangulToKeyFn(res);
    }
  };
};
const disassembleToKeys = disassembleFactory(transformToKeys);
export const hangulToKeys = (data, grouped) => (data, disassembleToKeys)
  |> (grouped ? deepMap : deepFlatMap);

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
const transformToHangul = data => deepMap(data, transformCharToHangul);
const assembleFromKeys = assembleFactory(transformToHangul);
export const keysToHangul = data => assembleFromKeys()(data);
// it's okay that we're not standarizing because the data
// in hangulToKey is already standard :)
