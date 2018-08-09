import { all } from './unicode/complexTree';
import { choNum, jungNum, jongNum } from './unicode/syllable';
import composeSyllable from './composeSyllable';
import { standardizeCharacter } from './standardize';
// since these functions are exposed, the characters must be
// standardized so that the libaray can function properly

export const complex = (first, second, third = '', hardFail) => {
  if (first === undefined || second === undefined) {
    throw Error('Cannot compose a complex with less than two values!');
  }
  const d1 = all[standardizeCharacter(first)];
  // depth 1
  if (!d1) {
    if (hardFail) {
      throw Error(`There's no complex character that starts with ${first}`);
    }
    return `${first}${second}${third}`;
  }
  const d2 = d1[standardizeCharacter(second)];
  // depth 2
  if (!d2) {
    if (hardFail) {
      throw Error(`Cannot combine ${first} and ${second}`);
    }
    return `${first}${second}${third}`;
  }
  const d2val = d2.$ || d2;
  if (third) {
    // if there's a third character (optional)
    const d3 = d2[standardizeCharacter(third)];
    // depth 3
    if (!d3) {
      // if depth 3 doesn't exist
      if (hardFail) {
        throw Error(`Found ${d2val} but cannot combine ${first}, ${second}, and ${third}`);
        // the reason for this ^^^ is because sometimes
        // d2 is a string rather than an object
      }
      return `${d2val}${third}`;
      // at depth three, there should be a complex formed from
      // the first and second characters so return that instead
      // of the inputs concatenated
    }
    return d3; // this should always be a string
  }
  // the third character was falsey so just return the composition
  return d2val;
};
// this function will always return a String or it'll error (hardFail)
// there's probably a better way to structure these if-statements
// so if anyone comes up with one, I'll take it

export const syllable = (choChar, jungChar = '', jongChar = '', hardFail) => {
  const cho = choNum[standardizeCharacter(choChar)];
  const jung = jungNum[standardizeCharacter(jungChar)];
  let jong;
  if (jongChar) {
    jong = jongNum[standardizeCharacter(jongChar)];
  } if (!Number.isInteger(cho)) {
    if (hardFail) {
      throw Error(`"${choChar}" is not a valid cho Character`);
    }
    return `${choChar}${jungChar}${jongChar}`;
  } if (!Number.isInteger(jung)) {
    if (hardFail) {
      throw Error(`"${jungChar}" is not a valid jung Character`);
    }
    return `${choChar}${jungChar}${jongChar}`;
  } if (jongChar && !Number.isInteger(jong)) {
    // check if it exists because !Number.isInteger(undefined)
    // is true and we don't want that happening since jongChar
    // is optional
    if (hardFail) {
      throw Error(`"${jongChar}" is not a valid jong character`);
    }
    // getting here means that the cho and jung
    // characters were valid, so call composeSyllable
    return `${composeSyllable(cho, jung)}${jongChar}`;
  }
  return composeSyllable(cho, jung, jong);
};
// by nesting all if-statements under if (hardFail)
// there might be a little better performance but I'm
// sure that it's pretty trivial.
