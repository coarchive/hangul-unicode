import { nameObject } from './name';
import { is, isAll, contains } from './testBlock';
import * as consonant from './testConsonant';
import * as vowel from './testVowel';

is.consonant = consonant.isConsonant;
isAll.consonant = consonant.isConsonantAll;
contains.consonant = consonant.containsConsonant;
is.vowel = vowel.isVowel;
isAll.vowel = vowel.isVowelAll;
contains.vowel = vowel.containsVowel;
nameObject({ is });
nameObject({ isAll });
nameObject({ contains });
export { is, isAll, contains };
