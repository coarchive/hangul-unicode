import { composeComplex_g_T } from './compose';
import { transformNonStandard_U } from './transform';
import { publicMapOpts } from './deepMap';

export const standardizeCharacterBase_U = (opts) => {
  const cc = composeComplex_g_T(opts);
  return (datum) => {
    const res = transformNonStandard_U(datum);
    if (Array.isArray(res)) {
      return cc(res);
    }
    return res;
  };
};
export default (publicMapOpts(standardizeCharacterBase_U));
// _g_U
