import hasProp, { hasPropCurried } from '../hasProp';

const complex = {
  // consonants
  ㄱ: {
    ㄱ: 'ㄲ',
    ㅅ: 'ㄳ',
  },
  ㄴ: {
    ㅈ: 'ㄵ',
    ㅎ: 'ㄶ',
  },
  ㄷ: {
    ㄷ: 'ㄸ',
  },
  ㄹ: {
    ㄱ: 'ㄺ',
    ㅁ: 'ㄻ',
    ㅂ: 'ㄼ',
    ㅅ: 'ㄽ',
    ㅌ: 'ㄾ',
    ㅍ: 'ㄿ',
    ㅎ: 'ㅀ',
  },
  ㅂ: {
    ㅂ: 'ㅃ',
    ㅅ: 'ㅄ',
  },
  ㅅ: {
    ㅅ: 'ㅆ',
  },
  ㅈ: {
    ㅈ: 'ㅉ',
  },
  // vowels
  ㅗ: {
    ㅏ: 'ㅘ',
    ㅐ: 'ㅙ',
    ㅣ: 'ㅚ',
  },
  ㅜ: {
    ㅓ: 'ㅝ',
    ㅔ: 'ㅞ',
    ㅣ: 'ㅟ',
  },
  ㅡ: {
    ㅣ: 'ㅢ',
  },
};
const irregularComplex = {
  ㄴ: {
    ㄴ: 'ㅥ',
    ㄷ: 'ㅦ',
    ㅅ: 'ㅧ',
    ㅿ: 'ㅨ',
  },
  ㄹ: {
    ㄱ: {
      ㅅ: 'ㅩ',
    },
    ㄷ: 'ㅪ',
    ㅂ: {
      ㅅ: 'ㅫ',
    },
    ㅿ: 'ㅬ',
    ㆆ: 'ㅭ',
  },
  ㅁ: {
    ㅂ: 'ㅮ',
    ㅅ: 'ㅯ',
    ㅿ: 'ㅰ',
  },
  ㅂ: {
    ㄱ: 'ㅲ',
    ㄷ: 'ㅳ',
    ㅅ: {
      ㄱ: 'ㅴ',
      ㄷ: 'ㅵ',
    },
    ㅈ: 'ㅶ',
    ㅌ: 'ㅷ',
  },
  ㅅ: {
    ㄱ: 'ㅺ',
    ㄴ: 'ㅻ',
    ㄷ: 'ㅼ',
    ㅂ: 'ㅽ',
    ㅈ: 'ㅾ',
  },
  ㅇ: {
    ㅇ: 'ㆀ',
  },
  ㆁ: {
    ㅅ: 'ㆁ',
    ㅿ: 'ㅿ',
  },
  ㅎ: {
    ㅎ: 'ㆅ',
  },
  ㅛ: {
    ㅑ: 'ㆇ',
    ㅒ: 'ㆈ',
    ㅣ: 'ㆉ',
  },
  ㅠ: {
    ㅕ: 'ㆊ',
    ㅖ: 'ㆋ',
    ㅣ: 'ㆌ',
  },
  ㆍ: {
    ㅣ: 'ㆎ',
  },
};
const g2l = o => ary => o[ary[0]][ary[1]];
export const hasCounterpart = hasPropCurried(complex);
export const hasIrregularCounterpart = hasPropCurried(irregularComplex);
export const hasAnyCounterpart = char => hasCounterpart(char) || hasIrregularCounterpart(char);
export const complexExists = ary => hasCounterpart(ary[0]) || hasProp(complex[ary[0]], ary[1]);
const irregularComplexExists = ary => (
  hasIrregularCounterpart(ary[0])
  || hasProp(irregularComplex[ary[0]], ary[1])
);
export const anyComplexExists = ary => complexExists(ary) || irregularComplexExists(ary);
export const getComplex = g2l(complex);
export const getIrregularComplex = g2l(irregularComplex);
