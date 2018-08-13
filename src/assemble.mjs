import composeAnything from './compose';
import { deepMap, deepFlatResMap } from './types';
import { transformEveryDatum } from './transform';
// this way, we can trust the inputs to composeAnything

export default ((data, mode) => deepFlatResMap(deepMap(data, transformEveryDatum), composeAnything(mode)));
