import { isCharacterGroup } from './types';

export const isAll = testFn => (data) => {
  const len = data.length;
  if (Array.isArray(data)) {
    for (let i = 0; i < len; i++) {
      const val = data[i];
      if (isCharacterGroup(val) ? isAll(testFn)(val) : testFn(val)) {
        continue;
      }
      // the loop will get here if it doesn't satisfy the testing function
      return false;
    }
    return true;
  } if (typeof data === 'string') {
    for (let i = 0; i < len; i++) {
      const val = data[i];
      if (testFn(val)) {
        continue;
      }
      return false;
    }
    return true;
  }
  throw TypeError('The data must be an Array or a String!');
};
export const contains = testFn => (data) => {
  const len = data.length;
  if (Array.isArray(data)) {
    for (let i = 0; i < len; i++) {
      const val = data[i];
      if (isCharacterGroup(val) ? isAll(testFn)(val) : testFn(val)) {
        return true;
        // this allows the function to short circut
      }
    }
    return false;
  } if (typeof data === 'string') {
    for (let i = 0; i < len; i++) {
      const val = data[i];
      if (testFn(val)) {
        return true;
      }
    }
    return false;
  }
  throw TypeError('The data must be an Array or a String!');
};
