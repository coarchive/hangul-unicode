import { complex, irregularComplex } from './unicode/complex';

const descend = o => (...ary) => {
  const lowerObject = o[ary[0]];
  if (lowerObject) {
    return descend(lowerObject, ary.slice(1));
  }
  return false;
};
const composeComplex = descend(complex);
export const composeIrregularComplex = descend(irregularComplex);
export default (composeComplex);
export const composeAnyComplex = (...ary) => (
  composeComplex(...ary)
  || composeIrregularComplex(...ary)
);
