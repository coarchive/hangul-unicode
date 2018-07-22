import assertChar from './assertChar';
import { isAll } from './array';
import R from './Result';

const isAllString = isAll(v => typeof v === 'string');
export default (...objList) => (...ary) => {
  let objects = objList.slice();
  if (!objects.length) {
    throw new Error('Cannot compose complex without a list of complex to compose!');
  } if (ary.length < 2) {
    throw new Error('Cannot compose complex of less than 2 characters!');
  }
  let i = 0;
  let res = '';
  while (i < ary.length) {
    const currentChar = ary[i];
    assertChar(currentChar);
    const currentObjects = objects.map(obj => obj[currentChar]).filter(v => v);
    if (!currentObjects.length) {
      // the current char in the array cannot be attached to the previous
      // characters to form a complex character
      res = objects[0].$;
      break;
    } if (isAllString(currentObjects)) {
      // if there's only one option to choose from
      [res] = currentObjects;
      i++;
      break;
    }
    objects = currentObjects;
    i++;
    if (i === ary.length) {
      if (typeof currentObjects[0] === 'string') {
        [res] = currentObjects;
        break;
      }
      res = currentObjects[0].$;
    }
  }
  return new R(res, ary.slice(i));
};
