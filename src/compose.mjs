import * as complex from './unicode/complex';
import { choNum, jungNum, jongNum } from './unicode/syllable';
import composeSyllableFn from './composeSyllable';
import R from './Result';
import { transformAll } from './transformCharacter';

export const composeComplex = (...objList) => (ary) => {
  const obj = Object.assign({}, ...objList);
  // const str = ary.map(transformAll).flat().join('');
  const str = ary.join();
  console.log(str);
  if (str.length < 2) {
    return new R(str[0]);
  }
  const comp2 = obj[str.slice(0, 2)];
  if (comp2) {
    const comp3 = obj[str.slice(0, 3)];
    if (comp3) {
      return new R(comp3, str.slice(3));
    }
    return new R(comp2, str.slice(2));
  }
  return new R(str);
};
//
export const composeAnyComplex = composeComplex(
  complex.cho,
  complex.jung,
  complex.jong,
  complex.irregular,
);

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
// default @ComposeFunction: ...Character => Result
