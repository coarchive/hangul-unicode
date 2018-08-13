import composeAnything from './compose';
import { deepMap, deepFlatResMap } from './types';
import { transformEveryDatum } from './transform';
// this way, we can trust the inputs to composeAnything
export const assembleFactory = transformer => (data, mode) => deepFlatResMap(transformer(data), composeAnything(mode));
// the transformer should verify that each datum is a Character!
const assembleTransformer = data => deepMap(data, transformEveryDatum);
// this takes a CharacterGroup and transforms characters and
// complex characters, effectively leaving behind only the
// base Characters
// it doesn't decomposeSyllables though
export default (assembleFactory(assembleTransformer));
