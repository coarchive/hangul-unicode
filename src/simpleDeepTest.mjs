import { isCharacterGroup } from './types';

const base = (bool) => {
  const resFn = testFn => (data) => {
    const len = data.length;
    if (Array.isArray(data)) {
      for (let i = 0; i < len; i++) {
        const val = data[i];
        if (!bool ^ (isCharacterGroup(val) ? resFn(testFn)(val) : testFn(val))) {
          return bool;
          // this allows the function to short circut
        }
      }
      return !bool;
    } if (typeof data === 'string') {
      for (let i = 0; i < len; i++) {
        const val = data[i];
        if (!bool ^ testFn(val)) {
          return bool;
        }
      }
      return !bool;
    }
    throw TypeError('The data must be an Array or a String!');
  };
};
export const contains = base(true);
export const isAll = base(false);
