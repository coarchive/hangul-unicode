import { composeComplex_T } from './compose';
import { curriedMap } from './map';
import computeOpts from './options';
import { transformNonStandard_T } from './transform';

const cc = composeComplex_T({ complex3: true, complexArchaic: true } |> computeOpts);
export const standardizeCharacter = (char) => {
  const res = transformNonStandard_T(char);
  if (Array.isArray(res)) {
    return cc(res);
  }
  return res;
};
export default (curriedMap(standardizeCharacter));
// the only thing that this opts does is determine if it's grouped or not
