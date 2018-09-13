import composeAnything from './compose';
import sanitize from './sanitize';
import { deepFlatResMap } from './types';
// this way, we can trust the inputs to composeAnything
export const assembleFactory = transformer => (mode) => {
  const cA = composeAnything(mode);
  return data => deepFlatResMap(transformer(data), cA);
};
export default ((data, mode) => assembleFactory(sanitize)(mode));
