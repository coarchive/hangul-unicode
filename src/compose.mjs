import * as complex from './unicode/complex';
import { choNum, jungNum, jongNum } from './unicode/syllable';
import composeComplex from './composeComplex';
import { composeSyllableFn } from './composeSyllable';
import R from './Result';

const composeStandardComplex = composeComplex(complex.cho, complex.jung, complex.jong);

export default ((...ary) => {
  if (ary.length < 2) {
    return new R(ary[0]);
  }
  const choRes = composeStandardComplex(...ary);
  const choChar = choRes.result;
  const cho = choNum[choChar];
  if (!Number.isInteger(cho)) {
    return choRes;
  }
  const jungRes = composeStandardComplex(...choRes.remainder);
  const jungChar = jungRes.result;
  const jung = jungNum[jungChar];
  if (!Number.isInteger(jung)) {
    return new R(choChar, [jungChar, ...jungRes.remainder]);
  }
  const jongRes = composeStandardComplex(...jungRes.remainder);
  const jongChar = jongRes.result;
  const jong = jongNum[jongChar];
  if (!jong) {
    return new R(composeSyllableFn(cho, jung), [jongChar, ...jungRes.remainder]);
  }
  return new R(composeSyllableFn(cho, jung, jong), jongRes.remainder);
});
