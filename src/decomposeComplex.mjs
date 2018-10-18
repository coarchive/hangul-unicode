import { composeComplex_T } from './compose';
import computeOpts from './options';
import { transform_T } from './transform';
import {
  characterCollection, ENOCHAR, formatType, toString, valCharacter,
} from './types';

const c = composeComplex_T({
  complexJung: false,
  complexJong: false,
} |> computeOpts);
export const transformLeavingCho_T = (char) => {
  const res = transform_T(char);
  const cc = characterCollection(res);
  if (cc[0] & 2) {
    const cres = c(cc[1]);
    return cres.result + cres.remainder;
  }
  return cc[1];
};
export const chooseTransformer = (opts) => {
  const t = opts.decomposeDouble ? transform_T : transformLeavingCho_T;
  if (opts.grouped) {
    return char => char |> t |> formatType;
  }
  return t;
};
export default ((datum, opts = {}) => {
  const vC = valCharacter(datum);
  if (vC[0] === 2) {
    // nothing
    return '';
  }
  if (vC[0]) {
    return vC[1] |> chooseTransformer(opts) |> toString;
  }
  return ENOCHAR(vC[1]);
});
