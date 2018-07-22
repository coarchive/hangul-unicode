import * as complex from './unicode/complex';
import { choNum, jungNum, jongNum } from './unicode/syllable';
import composeComplex from './composeComplex';
import { composeSyllableFn } from './composeSyllable';
import R from './Result';

const composeComplexCho = composeComplex(complex.cho);
const composeComplexJung = composeComplex(complex.jung);
const composeComplexJong = composeComplex(complex.jong);

export default ((...ary) => {
  if (ary.length < 2) {
    throw new Error('Cannot compose a complex with less than two characters');
  }
  const choRes = composeComplexCho(...ary);
  const choChar = choRes.result;
  const cho = choNum[choChar];
  if (!cho) {
    return new R(ary[0], ary.slice(1));
  }
  const jungRes = composeComplexJung(choRes.remainder);
  const jungChar = jungRes.result;
  const jung = jungNum[jungChar];
  if (!jung) {
    return new R(choChar, choRes.remainder);
  }
  const jongRes = composeComplexJong(jungRes.remainder);
  const jongChar = jongRes.result;
  const jong = jongNum[jongChar];
  if (!jong) {
    return new R(composeSyllableFn(cho, jung), jungRes.remainder);
  }
  return new R(composeSyllableFn(cho, jung, jong), jongRes.remainder);
});
