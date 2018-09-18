import { vowels } from './unicode/characters';
import * as complex from './unicode/complex';
import { choNum, jungNum, jongNum } from './unicode/syllable';
import composeSyllableFn from './composeSyllable';
import R from './Result';
import computeOpts from './options';

// important note!
// these functions aren't going to really make any sense until
// you understand how they work in conjunction with the stuff
// that's in './types'. Read './Result' and './types' first.
// then read this.
export const composeComplex_T = (opts) => {
  if (opts.complex === false) {
    if (opts.hardFail) {
      throw Error("composeComplexBase shouldn't have been called since opts.complex is false!");
    }
    return chars => new R(chars.join(''));
    // this means that it doesn't process complex characters
  }
  const objs = [];
  if (opts.complexCho) {
    objs.push(complex.cho);
  }
  if (opts.complexJung) {
    objs.push(complex.jung);
  }
  if (opts.complexJong) {
    objs.push(complex.jong);
  }
  if (opts.archaic) {
    objs.push(complex.archaic);
  }
  const obj = Object.assign({}, ...objs);
  return (chars) => {
    const len = chars.length;
    if (len < 1) {
      if (opts.hardFail) {
        throw Error('Cannot compose array of zero characters!');
      }
      return new R();
    }
    const char1 = chars[0];
    if (len < 2) {
    // if there aren't even two Characters to use
      return new R(char1);
    }
    const char2 = chars[1];
    if (!opts.composeComplexDouble || char1 !== char2) {
      // we don't care about checking for complex doubles
      // or char1 !== char2
      const comp2 = obj[char1 + char2];
      // comp2 = composition of 2 characters
      if (comp2) {
        if (opts.complex3 && len > 2) {
        // if there's more data, try to compose a triple
          const comp3 = obj[char1 + char2 + chars[2]];
          if (comp3) {
            return new R(comp3, chars.slice(3));
          }
        }
        // there's no more data or couldn't find a comp3
        return new R(comp2, chars.slice(2));
      }
    }
    // couldn't find a comp2
    // or we care about checking for complex doubles
    // and char1 === char2
    return new R(char1, chars.slice(1));
  };
};
const isVowel = char => char && char !== 'ㆍ' && vowels[char];
export const compose_T = (opts) => {
  const currentopts = computeOpts(opts);
  const cc = composeComplex_T(currentopts);
  return (str) => {
    // this function takes an Array of characters and returns a new Result
    if (str.length < 2) {
      return new R(str[0]);
    // don't do extra computing for small operations
    }
    // the composeComplex function with the options that are specified
    const choRes = cc(str);
    // ^^ that's a Result object
    const choChar = choRes.result;
    // the result of the composition, should be a Character
    const choRem = choRes.remainder;
    // the remainder of the composition
    const cho = choNum[choChar];
    // the number that the character is mapped to
    if (choRem.length < 1 || !Number.isInteger(cho)) {
    // check if there's any more characters remaining
    // also check if it's not an integer since 0 == false
    // if it's not an integer, then return the potential
    // complex or Character that was made from composeAnyComplex
      return choRes;
    // choRes is already a Result so no need to make another
    }
    const jungRes = cc(choRem);
    const jungChar = jungRes.result;
    const jungRem = jungRes.remainder;
    const jung = jungNum[jungChar];
    if (!Number.isInteger(jung)) {
    // there's no need to check to see if there's any more
    // remaining since cho and jung are all that's needed
    // to compose a syllable
      return new R(choChar, jungChar + jungRem);
    // still only return choChar as a result since we want
    // to try starting a syllable off with the jungChar next
    // time this function is called
    }
    if (jungRem.length) {
      // there's no point in trying to add anything on to the complex
      // if there aren't any characters left
      if (!isVowel(jungRem[1])) {
        // we need this part so that
        // ㅁㅣㅇㅏ => 미아
        const jongRes = cc(jungRem);
        const jongChar = jongRes.result;
        const jongRem = jongRes.remainder;
        const jong = jongNum[jongChar];
        if (jong) {
          // if the character after the syllable is not a vowel
          // and the jong character is valid
          return new R(composeSyllableFn(cho, jung, jong), jongRem);
        }
      }
    }
    // there aren't any characters left
    // or the character after the syllable is a vowel
    // or the jong character isn't valid
    return new R(composeSyllableFn(cho, jung), jungRem);
  // The last argument is optional for the Result constructor
  };
};
