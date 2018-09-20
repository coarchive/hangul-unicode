import { hangulToKey, keyToHangul } from './unicode/characters';
import { generalMap } from './map';
import { disassembleCharacter_T } from './disassemble';
import { characterCollection, toArray } from './types';
import { assembleFactory } from './assemble';

// 한글 => gksrmf
const h2kfetcher = char => hangulToKey[char] || char;
const h2kconverter = hangulChar => do {
  const cc = characterCollection(hangulChar);
  if (cc[0] & 2) {
    toArray(cc[1]).map(h2kfetcher);
  } else {
    h2kfetcher(cc[1]);
  }
};
const h2ktransformer = (opts) => {
  const dC = disassembleCharacter_T(opts);
  return char => char |> dC |> h2kconverter;
};
export const hangulToKeys = (data, opts = {}) => generalMap(opts |> h2ktransformer, opts, data);

// gksrmf => 한글
const k2hfetcher = char => keyToHangul[char];
const k2hconverter = (latinChar) => {
  const res = k2hfetcher(latinChar);
  if (!res) {
    // couldn't find a key for that characters
    const lowerCaseRes = k2hfetcher(latinChar.toLowerCase());
    if (!lowerCaseRes) {
      return latinChar;
    }
    return lowerCaseRes;
  }
  return res;
};
export const keysToHangul = assembleFactory(k2hconverter);
// it's okay that we're not standarizing since it's latin
// that goes into the transformer
