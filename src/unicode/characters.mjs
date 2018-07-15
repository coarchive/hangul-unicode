import is from '../is';

const consonants = {
  ㄱ: 1,
  ㄴ: 1,
  ㄷ: 1,
  ㄹ: 1,
  ㅁ: 1,
  ㅂ: 1,
  ㅅ: 1,
  ㅇ: 1,
  ㅈ: 1,
  ㅊ: 1,
  ㅋ: 1,
  ㅌ: 1,
  ㅍ: 1,
  ㅎ: 1,
};
const vowels = {
  ㅏ: 1,
  ㅐ: 1,
  ㅑ: 1,
  ㅓ: 1,
  ㅔ: 1,
  ㅕ: 1,
  ㅖ: 1,
  ㅗ: 1,
  ㅛ: 1,
  ㅜ: 1,
  ㅠ: 1,
  ㅡ: 1,
  ㅣ: 1,
};
// ['ㄱ', 'ㄴ', 'ㄷ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅅ', 'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'];
// ['ㅏ', 'ㅐ', 'ㅑ', 'ㅒ', 'ㅓ', 'ㅔ', 'ㅕ', 'ㅖ', 'ㅗ', 'ㅛ', 'ㅜ', 'ㅠ', 'ㅡ', 'ㅣ'];
// They're stored as objects so there's no need for iteration

export const isConsonant = is(consonants);
export const isVowel = is(vowels);
