import { compose_T } from './compose';
import { flatResReducer } from './map';
import { flatSanitize_g_U } from './sanitize';
// this way, we can trust the inputs to composeAnything


export default ((data, opts) => {
  const c = compose_T(opts);
  return data |> flatSanitize_g_U |> c;
});
