import { Character, E } from './internalTypes';

import R from './Result';

const getCurrent = objList => (typeof objList[0] === 'string' ? objList[0] : objList[0].$);
// getCurrent: Array[ComplexMap] => Character
export default (...objList) => (...ary) => {
  let objects = objList.slice();
  if (!objects.length) {
    E('composeComplex', 'Cannot compose complex without a list of complex to compose!');
  } if (ary.length < 2) {
    return new R(ary[0]);
  }
  let i = 0;
  let res = '';
  while (i < ary.length) {
    const currentChar = Character(ary[i]);
    const currentObjects = objects.map(obj => obj[currentChar]).filter(v => v);
    if (!currentObjects.length) {
      // the current char in the array cannot be attached to the previous
      // characters to form a complex character
      res = getCurrent(objects);
      if (!res) {
        res = currentChar;
        i++;
      }
      break;
    } if (currentObjects.every(val => typeof val === 'string')) {
      // if there's only one option to choose from
      [res] = currentObjects;
      i++;
      break;
    }
    objects = currentObjects;
    i++;
    if (i === ary.length) {
      res = getCurrent(currentObjects);
    }
  }
  return new R(res, ary.slice(i));
};
// default instanceof ComposeFunction: Array[ComplexMap] => ...Array[Character] => Result
