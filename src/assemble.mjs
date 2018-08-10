import composeAnything, { composeComplexBase, composeComplexBaseDepth3 } from './compose';
import { deepFlatResMap } from './types';

const composeAnythingDepth3 = composeAnything(composeComplexBaseDepth3);
const composeAnythingNormal = composeAnything(composeComplexBase);
export default ((ary, depth3) => deepFlatResMap(ary, (depth3 ? composeAnythingDepth3 : composeAnythingNormal)));
