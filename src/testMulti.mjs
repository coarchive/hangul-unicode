import { transformEveryDatum } from './transform';
import { deepFlatMap } from './types';

export default (aryFnName => isFn => data => deepFlatMap(data, transformEveryDatum)[aryFnName](isFn));
