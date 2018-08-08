import { all } from './unicode/complexTree';
import { choNum, jungNum, jongNum } from './unicode/syllable';
import composeSyllable from './composeSyllable';
import transform from './transform';
import { Character } from './types';
// since these functions are exposed, the characters must be
// standardized so that the libaray can function properly

export const complex = (first, second, third = '', hardFail) => {
  let obj = all[transform(first)];
  if (!obj) {
    if (hardFail) {
      throw Error(`There's no complex character that starts with ${first}`);
    }
    return `${first}${second}${third}`;
  }
  obj = obj[transform(second)];
  if (!obj) {
    if (hardFail) {
      throw Error(`Cannot combine ${first} and ${second}`);
    }
    return `${first}${second}${third}`;
  }
  if (third) {
    obj = obj[transform(third)];
    if (!obj) {
      if (hardFail) {
        throw Error(`Cannot combine ${first}, ${second}, and ${third}`);
      }
      return `${first}${second}${third}`;
    }
    return obj; // this should always be a string
  } if (typeof obj === 'string') {
    return obj;
  }
  return obj.$;
};
// this function will always return a String (or it'll error)
// there's probably a better way to structure these if-statements
// so if anyone comes up with one, I'll take it

export const syllable = (choChar, jungChar, jongChar = '', hardFail) => {
  const choT = transform(Character(choChar));
  const cho = choNum[transform(choChar)];
  const jung = jungNum[transform(jungChar)];
  let jong;
  if (jongChar) {
    jong = jongNum[transform(Character(jongChar))];
  } if (!Number.isInteger(cho)) {
    if (hardFail) {
      throw Error(`"${choChar}" is not a valid cho Character`);
    }
    return `${choChar}${jungChar}${jungChar}`;
  } if (!Number.isInteger(jung)) {
    if (hardFail) {
      throw Error(`"${jungChar}" is not a valid jung Character`);
    }
    return `${choChar}${jungChar}${jungChar}`;
  } if (jongChar && !Number.isInteger(jong)) {
    if (hardFail) {
      throw Error(`"${jongChar}" is not a valid jong character`);
    }
    return `${choChar}${jungChar}${jungChar}`;
  }
  return composeSyllable(cho, jung, jong);
};
