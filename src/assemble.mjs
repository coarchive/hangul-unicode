import composeAnything from './compose';
import { transformEveryDatum } from './transform';
import { deepMap, deepFlatResMap } from './types';
// this way, we can trust the inputs to composeAnything
export const assembleFactory = transformer => (mode) => {
  const cA = composeAnything(mode);
  return data => deepFlatResMap(transformer(data), cA);
};
// the transformer should verify that each datum is a Character!
const assembleTransformer = data => deepMap(data, transformEveryDatum);
// this takes a CharacterGroup and transforms characters and
// complex characters, effectively leaving behind only the
// base Characters
// it doesn't decomposeSyllables though
export default ((data, mode) => assembleFactory(assembleTransformer)(mode));
