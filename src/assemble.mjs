import { compose_T } from './compose';
import { flatResReducer } from './map';
import computeOpts from './options';
// import { flatSanitize_g_U } from './sanitize';
// this way, we can trust the inputs to composeAnything
export const assembleFactory = transformer => (data, opts) => {
  const cOpts = computeOpts(opts);
  const c = compose_T(cOpts);
  const t = str => str |> transformer |> c;
  return flatResReducer(t, data);
};

export default (assembleFactory(v => v));
