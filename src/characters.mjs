import is from './is';

const consonants = ['ㄱ', 'ㄴ', 'ㄷ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅅ', 'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'];
const vowels = ['ㅏ', 'ㅐ', 'ㅑ', 'ㅒ', 'ㅓ', 'ㅔ', 'ㅕ', 'ㅖ', 'ㅗ', 'ㅛ', 'ㅜ', 'ㅠ', 'ㅡ', 'ㅣ'];
const complex = {
  ㄱ: ['ㄱ', 'ㅅ', 'ㅈ', 'ㅎ'],
  ㄷ: 'ㄷ',
  ㄹ: ['ㄱ', 'ㅁ', 'ㅂ', 'ㅅ', 'ㅌ', 'ㅍ', 'ㅎ'],
  ㅂ: ['ㅂ', 'ㅅ'],
  ㅅ: 'ㅅ',
  ㅈ: 'ㅈ',
};
const isConsonant = is(consonants);
const isVowel = is(vowels);
const isComplex = is(complex);

export {
  complex,
  isConsonant,
  isVowel,
  isComplex,
};
