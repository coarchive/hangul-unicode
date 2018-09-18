import { transformNonStandard_U } from './transform';
import { map, flatMap } from './map';

export const sanitize_g_U = data => map(transformNonStandard_U, data);
export const flatSanitize_g_U = data => flatMap(transformNonStandard_U, data);
// this function takes a Character group and converts
// all of the Characters to standard hangul
// it doesn't do any decomposeSyllable stuff
// TODO: change this to publicMap
