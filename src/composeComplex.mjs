import { Character } from './internalTypes';

import R from './Result';

export default (...objList) => (ary) => {
  const obj = Object.apply({}, ...objList);
  if (!objList.length) {
    E('composeComplex', 'Cannot compose complex without a list of complex to compose!');
  } if (ary.length < 2) {
    return new R(ary[0]);
  }
  let i = 2;
  let res = '';
  while (i < 4) { // complex key length is always a maximum of three unless unicode changes
    const comp = obj[ary.slice(0, i)];
    if (comp) {
      res = Character(comp);
      break;
    }
    i++;
  }
  return new R(res, ary.slice(i));
};
// default instanceof ComposeFunction: ...ComplexMap => CharacterGroup => Result
