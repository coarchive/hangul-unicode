import { hangulToKey, keyToHangul } from './unicode/characters';
import { generalMap, flatResReducer } from './map';
import { disassembleCharacter_T } from './disassemble';
import { characterCollection, toArray } from './types';
import { compose_T } from './compose';

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
const k2hfetcher = char => keyToHangul[char] || char;
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
const k2htransformer = (data, opts = {}) => generalMap(k2hconverter, opts, data);
export const keysToHangul = (data, opts = {}) => {
  const c = compose_T(opts);
  const t = str => k2htransformer(str, opts) |> c;
  return flatResReducer(t, data);
};
// it's okay that we're not standarizing because the data
// in hangulToKey is already standard :)
