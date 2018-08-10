import { transformEveryCharacter } from './transform';
import { deepFlatMap } from './types';

export default (aryFnName => isFn => data => deepFlatMap(data, transformEveryCharacter)[aryFnName](isFn));
