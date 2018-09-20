import { vowels } from './unicode/characters';
import { contains, isAll } from './deepTest';
import is from './is';

const vowel = char => vowels[char];
export const isVowel = is(vowel);
export const isVowelAll = isAll(vowel);
export const containsVowel = contains(vowel);
