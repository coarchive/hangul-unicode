import composeAnything from './compose';
import { deepFlatResMap } from './types';

export default ((data, mode) => deepFlatResMap(data, composeAnything(mode)));
// composeFn => (data, mode);
