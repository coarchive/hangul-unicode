import composeAnything, { composeComplexBase, composeComplexBaseDepth3 } from './compose';
import { deepFlatResMap } from './types';

export const composeAnythingDepth3 = composeAnything(composeComplexBaseDepth3);
const composeAnythingNormal = composeAnything(composeComplexBase);
export default ((data, depth3) => deepFlatResMap(data, (depth3 ? composeAnythingDepth3 : composeAnythingNormal)));
