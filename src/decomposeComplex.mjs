import { composeComplex } from './compose';
import { noJungJong } from './mode';
import { transformEveryChar } from './transform';
import { Character, toArray } from './types';

const composeComplexCho = composeComplex(noJungJong);
export const transformExceptCho = (char) => {
  const res = transformEveryChar(char);
  if (Array.isArray(res)) {
    const comp = composeComplexCho(res);
    // the default composeComplex only composes cho
    // HACK: this bug might be an issue with composeComplex
    if (Array.isArray(comp) && comp.length === 1) {
      // if the composition actually ends up composing
      // something and it's only one Character, just
      // return the Character instead of an Array
      return Character(comp);
    }
    return comp;
  }
  return res;
};
// this function is needed by disassemble so it's trusting
export default ((datum, decomposeDoubles) => toArray((decomposeDoubles ? transformEveryChar : transformExceptCho)(Character(datum))));
