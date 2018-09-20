import { consonants } from './unicode/characters';
import { contains, isAll } from './deepTest';
import is from './is';

const consonant = char => consonants[char];
export const isConsonant = is(consonant);
export const isConsonantAll = isAll(consonant);
export const containsConsonant = contains(consonant);
