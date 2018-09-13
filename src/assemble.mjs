import composeAnything from './compose';
import sanitize from './sanitize';
import { deepFlatResMap } from './types';
// this way, we can trust the inputs to composeAnything
export const assembleFactory = transformer => (mode) => {
  const fn = mode
  |> composeAnything
  |> deepFlatResMap;
  return data => data
  |> transformer
  |> fn;
};
export default ((data, mode) => assembleFactory(sanitize)(mode)(data));
