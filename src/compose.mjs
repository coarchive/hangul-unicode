import * as complex from './unicode/complex';
import { choNum, jungNum, jongNum } from './unicode/syllable';
import composeSyllableFn from './composeSyllable';
import R from './Result';
import { deepFlatResMap } from './types';

// important note!
// these functions aren't going to really make any sense until
// you understand how they work in conjunction with the stuff
// that's in './types'. Read './Result' and './Types' first.
// then read this.
const composeComplexFactory = (...objList) => {
  const obj = Object.assign({}, ...objList);
  // obj is stored in this scope to revent redundant operations
  return ((ary) => {
    if (ary.length < 2) {
      return new R(ary[0]);
    }
    const d1 = obj[ary.slice(0, 2).join('')];
    // this makes sense if you read * from './unicode/complex' (so read it)
    // depth 1, two combined characters
    if (d1) {
      const d2 = ary.length > 2 && obj[ary.slice(0, 3).join('')];
      if (d2) {
        return new R(d2, ary.slice(3));
      }
      // depth 2 doesn't exist or was never specified
      return new R(d1, ary.slice(2));
    }
    // couldn't find any depth 1 objects for the
    // first character within ary
    return new R(ary[0], ary.slice(1));
  });
};
// a factory for composeComplexBases
export const composeComplexBase = composeComplexFactory(
  complex.cho,
  complex.jung,
  complex.jong,
);
export const composeComplexBaseDepth3 = composeComplexFactory(
  complex.cho,
  complex.jung,
  complex.jong,
  complex.irregular,
);
// both of these base functions return Results so that's why
// they need deepFlatResMap instead of deepFlatMap
export const composeComplex = ary => deepFlatResMap(ary, composeComplexBase);
export const composeComplexDepth3 = ary => deepFlatResMap(ary, composeComplexBaseDepth3);
export default (compFn => (ary) => {
  // while this function is named "composeSyllable", it actually
  // can be used to compose anything, really.
  if (ary.length < 2) {
    return new R(ary[0]);
    // don't do extra computing for small operations
  }
  const choRes = compFn(ary);
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
  const jungRes = compFn(choRes.remainder);
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
    const jongRes = compFn(jungRes.remainder);
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
