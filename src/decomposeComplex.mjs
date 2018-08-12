import { composeComplex } from './compose';
import { transformEverything } from './transform';
import { Character, toArray } from './types';

export const transformExceptDoubles = (char) => {
  const res = transformEverything(char);
  if (Array.isArray(res)) {
    return composeComplex(res, 4);
  }
  return res;
};
// I couldn't think of what else to call it.
export default ((val, decomposeDoubles) => toArray((decomposeDoubles ? transformEverything : transformExceptDoubles)(Character(val))));
