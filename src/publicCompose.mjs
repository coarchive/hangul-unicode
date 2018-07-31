import { all } from './unicode/complexTree';
import { choNum, jungNum, jongNum } from './unicode/syllable';
import composeSyllable from './composeSyllable';
import { standardizeCharacter } from './standardize';
import { isCharacter, Character } from './types';
// since these functions are exposed, the characters must be
// standardized so that the libaray can function properly
// standardizeCharacter is untrusting so there's no need
// to worry about typechecking.

export const complex = (first, second, third) => {
  if (!isCharacter(first) || !isCharacter(second)) {
    throw TypeError('Composing a complex requires at least two Characters');
  }
  let obj = all[standardizeCharacter(first)];
  if (!obj) {
    throw Error(`There's no complex character that starts with ${first}`);
  }
  obj = obj[standardizeCharacter(second)];
  if (!obj) {
    throw Error(`Cannot combine ${first} and ${second}`);
  }
  if (third) {
    if (!isCharacter(third)) {
      throw TypeError('The third argument is not a Character');
    }
    obj = obj[standardizeCharacter(third)];
    if (!obj) {
      throw Error(`Cannot combine ${first}, ${second}, and ${third}`);
    }
    return obj; // this should always be a string
  } if (typeof obj === 'string') {
    return obj;
  }
  return obj.$;
};
export const syllable = (choChar, jungChar, jongChar) => {
  if (!isCharacter(choChar) || !isCharacter(choChar)) {
    throw TypeError('Composing a syllable requires a cho Character and a jung Character');
  }
  const cho = choNum[standardizeCharacter(choChar)];
  const jung = jungNum[standardizeCharacter(jungChar)];
  let jong;
  if (jongChar) {
    jong = jongNum[standardizeCharacter(Character(jongChar))];
  } if (!Number.isInteger(cho)) {
    throw Error(`"${choChar}" is not a valid cho Character`);
  } if (!Number.isInteger(jung)) {
    throw Error(`"${jungChar}" is not a valid jung Character`);
  } if (jongChar && !Number.isInteger(jong)) {
    throw Error(`"${jongChar}" is not a valid jong character`);
  }
  return composeSyllable(cho, jung, jong);
};
// default: UP:>Character, UP:>Character [, UP:>Character] => String
