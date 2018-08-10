import { vowels } from './unicode/characters';
import contains from './contains';
import is from './is';
import isAll from './isAll';
import name from './name';

const vowel = char => vowels[char];
export const isVowel = is(vowel);
export const isVowelAll = isAll(vowel);
export const containsVowel = contains(vowel);
name({
  isVowel,
  isVowelAll,
  containsVowel,
});
