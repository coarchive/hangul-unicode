import composeAnything from './compose';
import { flatSanitize_g_U } from './sanitize';
import { deepFlatResMap } from './deepMap';
// this way, we can trust the inputs to composeAnything
export const assembleFactory_g_T = transformer => (opts) => {
  const fn = opts
  |> composeAnything
  |> deepFlatResMap;
  return data => data
  |> transformer
  |> fn;
};
export default (false |> assembleFactory_g_T(flatSanitize_g_U));
