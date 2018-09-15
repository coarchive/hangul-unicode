import { transformNonStandard_U } from './transform';
import { deepMap, deepFlatMap } from './deepMap';

export const sanitize_g_U = deepMap(transformNonStandard_U);
export const flatSanitize_g_U = deepFlatMap(transformNonStandard_U);
// this function takes a Character group and converts
// all of the Characters to standard hangul
// it doesn't do any decomposeSyllable stuff
// TODO: change this to publicMap
