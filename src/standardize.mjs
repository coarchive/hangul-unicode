import { composeComplex_T } from './compose';
import { curriedMap } from './map';
import computeOpts from './options';
import { transformNonStandard_T } from './transform';
import { toString } from './types';

const cc = composeComplex_T({ complex3: true, complexArchaic: true } |> computeOpts);
export const standardizeCharacter = (char) => {
  const res = transformNonStandard_T(char);
  if (Array.isArray(res)) {
    const comp = cc(res |> toString);
    // remove when data changes
    return [comp.result, comp.remainder];
  }
  return res;
};
export default (curriedMap(standardizeCharacter));
// the only thing that this opts does is determine if it's grouped or not
