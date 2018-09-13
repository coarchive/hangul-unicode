import { transformEveryDatum } from './transform';
import { deepMap } from './types';

export default (deepMap(transformEveryDatum));
// this function takes a Character group and converts
// all of the Characters to standard hangul
// it doesn't do any decomposeSyllable stuff
