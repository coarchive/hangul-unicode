import * as complex from './unicode/complex';
import { choNum, jungNum, jongNum } from './unicode/syllable';
import composeSyllableFn from './composeSyllable';
import R from './Result';
import { deepFlatResMap } from './types';

export const composeComplex = (...objList) => {
  const obj = Object.assign({}, ...objList);
  return ((ary) => {
    if (ary.length < 2) {
      return new R(ary[0]);
    }
    const comp2 = obj[ary.slice(0, 2).join('')];
    if (comp2) {
      const comp3 = ary.length > 2 && obj[ary.slice(0, 3).join('')];
      if (comp3) {
        return new R(comp3, ary.slice(3));
      }
      return new R(comp2, ary.slice(2));
    }
    return new R(ary[0], ary.slice(1));
  });
};
//
const composeAnyComplexBase = composeComplex(
  complex.cho,
  complex.jung,
  complex.jong,
  complex.irregular,
);
const composeComplexChoBase = composeComplex(complex.cho);
export const composeAnyComplex = ary => deepFlatResMap(ary, composeAnyComplexBase);
export const composeComplexCho = ary => deepFlatResMap(ary, composeComplexChoBase);
export const composeSyllable = (ary) => {
  if (ary.length < 2) {
    return new R(ary[0]);
  }
  const choRes = composeAnyComplex(ary);
  const choChar = choRes.result;
  const cho = choNum[choChar];
  if (!Number.isInteger(cho)) {
    return choRes;
  }
  const jungRes = composeAnyComplex(choRes.remainder);
  const jungChar = jungRes.result;
  const jung = jungNum[jungChar];
  if (!Number.isInteger(jung)) {
    return new R(choChar, [jungChar, jungRes.remainder]);
  }
  const jongRes = composeAnyComplex(jungRes.remainder);
  const jongChar = jongRes.result;
  const jong = jongNum[jongChar];
  if (!jong) {
    return new R(composeSyllableFn(cho, jung), [jongChar, ...jungRes.remainder]);
  }
  return new R(composeSyllableFn(cho, jung, jong), jongRes.remainder);
};
