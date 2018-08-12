import * as complex from './unicode/complex';
import { choNum, jungNum, jongNum } from './unicode/syllable';
import composeSyllableFn from './composeSyllable';
import R from './Result';
import { Character, deepFlatResMap } from './types';

// important note!
// these functions aren't going to really make any sense until
// you understand how they work in conjunction with the stuff
// that's in './types'. Read './Result' and './types' first.
// then read this.
const modern = Object.assign({}, complex.cho, complex.jung, complex.jong);
const archaic = Object.assign({}, modern, complex.archaic);
const useComp3 = 0b001;
const useArchaic = 0b010;
const useChoOnly = 0b100;
const composeComplexBase = (ary, mode) => {
  if (mode < 0 || mode > 4) {
    throw Error('The mode cannot be less than zero or greater than four!');
  }
  const obj = mode === useChoOnly ? complex.cho : mode & useArchaic ? archaic : modern;
  // 0 === modern && comp2
  // 1 === modern && comp3
  // 2 === archaic && comp2
  // 3 === archaic && comp3
  // 4 === choOnly && comp2
  const len = ary.length;
  const char1 = Character(ary[0]);
  if (len < 2) {
    return new R(char1);
  }
  const char2 = Character(ary[1]);
  const comp2 = obj[char1 + char2];
  // comp2 = composition of 2 characters
  if (comp2) {
    if (mode & useComp3 && len > 2) {
      // if there's more data, try to compose a tripple
      const char3 = Character(ary[2]);
      const comp3 = obj[char1 + char2 + char3];
      if (comp3) {
        return new R(comp3, ary.slice(3));
      }
    }
    // there's no more data or couldn't find a comp3
    return new R(comp2, ary.slice(2));
  }
  // couldn't find a comp2
  return new R(char1, ary.slice(1));
};
export const composeComplex = ary => deepFlatResMap(ary, composeComplexBase);
export default (mode => (ary) => {
  // while this function is named "composeSyllable", it actually
  // can be used to compose anything, really.
  if (ary.length < 2) {
    return new R(ary[0]);
    // don't do extra computing for small operations
  }
  const choRes = composeComplex(ary, mode);
  // ^^ that's a Result object
  const choChar = choRes.result;
  // the result of the composition, should be a Character
  const cho = choNum[choChar];
  // the number that the character is mapped to
  if (choRes.remainder.length < 1 || !Number.isInteger(cho)) {
    // check if there's any more characters remaining
    // also check if it's not an integer since 0 == false
    // if it's not an integer, then return the potential
    // complex or Character that was made from composeAnyComplex
    return choRes;
    // choRes is already a Result so no need to make another
  }
  const jungRes = composeComplex(choRes.remainder, mode);
  const jungChar = jungRes.result;
  const jung = jungNum[jungChar];
  if (!Number.isInteger(jung)) {
    // there's no need to check to see if there's any more
    // remaining since cho and jung are all that's needed
    // to compose a syllable
    return new R(choChar, [jungChar, ...jungRes.remainder]);
    // still only return choChar as a result since we want
    // to try starting a syllable off with the jungChar next
    // time this function is called
  }
  if (jungRes.remainder.length > 0) {
    const jongRes = composeComplex(jungRes.remainder, mode);
    const jongChar = jongRes.result;
    const jong = jongNum[jongChar];
    if (!jong) {
      // at this point, we've confirmed cho and jung characters
      // so return just a syllable of those two combined.
      return new R(composeSyllableFn(cho, jung), [jongChar, ...jungRes.remainder]);
      // the jongChar, and the jungRes.remainder can be saved for later.
    }
    return new R(composeSyllableFn(cho, jung, jong), jongRes.remainder);
    // yay! complete syllable!
  }
  return new R(composeSyllableFn(cho, jung));
  // The last argument is optional for the Result constructor
});
