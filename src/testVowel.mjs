import { vowels } from './unicode/characters';
import contains from './contains';
import is from './is';
import isAll from './isAll';

const vowel = char => vowels[char];
export const isVowel = is(vowel);
export const isVowelAll = isAll(vowel);
export const containsVowel = contains(vowel);
