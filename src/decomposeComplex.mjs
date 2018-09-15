import { composeComplex_T } from './compose';
import { transform_T } from './transform';
import { Character, isCharacterGroup, toString } from './types';

const composeComplexCho_g_T = composeComplex_T({ complexJung: false, complexJong: false });
export const transformLeavingCho_T = (char) => {
  const res = transform_T(char);
  if (isCharacterGroup(res)) {
    return res |> composeComplexCho_g_T |> toString;
  }
  return res;
};
export const curriedDecomposeComplex_T = opts => (opts.decomposeComplexDouble ? transform_T : transformLeavingCho_T);
export default ((datum, opts) => datum
  |> Character
  |> curriedDecomposeComplex_T(opts)
);
