import { hasPropCurried } from '../hasProp';

export const complex = {
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
export const irregularComplex = {
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

const descend = o => (...ary) => {
  const lowerObject = o[ary[0]];
  if (lowerObject) {
    return descend(lowerObject, ary.slice(1));
  }
  return false;
};
const beginIrregularComplex = hasPropCurried(irregularComplex);
const composeIrregularComplex = descend(irregularComplex);
export const beginComplex = hasPropCurried(complex);
export const composeComplex = descend(complex);
export const composeAnyComplex = (...ary) => (
  composeComplex(...ary)
  || composeIrregularComplex(...ary)
);
export const beginAnyComplex = char => (
  beginComplex(char)
  || beginIrregularComplex(char)
);
