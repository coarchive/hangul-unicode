import { makeAry } from './array';
import { transformChar } from './transformer';
import composeAnyComplex from './composeAnyComplex';

export function toStandardChar(char) {
  const v = transformChar(char);
  if (Array.isArray(v)) {
    const res = [];
    let rem = v;
    while (rem.length) {
      const comp = composeAnyComplex(...rem);
      res.push(comp.result);
      rem = comp.remainder;
    }
    return res;
  }
  return v;
}
export default (aryLike => makeAry(aryLike).map(toStandardChar));
