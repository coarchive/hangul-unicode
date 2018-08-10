import { transformEveryCharacter } from './transform';
import { toArray } from './types';

export default (isFn => data => toArray(transformEveryCharacter(data)).every(isFn));
