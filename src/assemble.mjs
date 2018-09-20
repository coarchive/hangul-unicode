import { compose_T } from './compose';
import { flatMapStr, flatResReducer } from './map';
import computeOpts from './options';
import { transformNonStandard_T } from './transform';

export const assembleFactory = characterTransformer => (data, opts) => {
  const cOpts = computeOpts(opts);
  const c = compose_T(cOpts);
  const t = str => flatMapStr(characterTransformer, str) |> c;
  // transformer will always get a String as an input
  return flatResReducer(t, data);
};

export default (assembleFactory(transformNonStandard_T));
