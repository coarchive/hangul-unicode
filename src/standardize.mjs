import { composeComplex } from './compose';
import { transformDatum } from './transform';
import { deepMap, deepFlatMap } from './types';

export const standardizeCharacterBase = (opts) => {
  const cc = composeComplex(opts);
  return (datum) => {
    const res = transformDatum(datum);
    if (Array.isArray(res)) {
      // atempt compose only if the value is an array
      // it's unfortunate, but any compFn is untrusting
      // since it's basically accessed publicly
      // we know that v will always have good types
      // but compFn will still check for Characters
      return cc(res);
      // returns an Array
    }
    return res;
  };
};
export const standardizeFactory = ((opts) => {
  const currentStandardize = standardizeCharacterBase(opts);
  return (data, grouped) => (grouped ? deepMap : deepFlatMap)(data, currentStandardize);
  // TODO: fix when publicMap is made
});
export default (data, grouped, opts) => standardizeFactory(opts)(data, grouped);
