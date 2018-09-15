import { transformEveryCharacter } from './transform';
import { deepMap, deepFlatMap } from './deepMap';

export const sanitize = deepMap(transformEveryCharacter);
export const flatSanitize = deepFlatMap(transformEveryCharacter);
// this function takes a Character group and converts
// all of the Characters to standard hangul
// it doesn't do any decomposeSyllable stuff
// TODO: change this to publicMap
