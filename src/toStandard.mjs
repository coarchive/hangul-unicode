import { assembleCompose, make } from './array';
import { transformChar } from './transformer';
import composeAnyComplex from './composeAnyComplex';

const assembleAnyComplex = assembleCompose(composeAnyComplex);
export function toStandardChar(char) {
  const v = transformChar(char);
  if (Array.isArray(v)) {
    return assembleAnyComplex(v);
  }
  return v;
}
export default (aryLike => make(aryLike).map(toStandardChar));
