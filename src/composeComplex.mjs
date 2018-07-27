import { Character, E } from './internalTypes';

import R from './Result';

export default (...objList) => (ary) => {
  const obj = Object.assign({}, ...objList);
  const str = ary.join('');
  if (!objList.length) {
    E('composeComplex', 'Cannot compose complex without a list of complex to compose!');
  } if (str.length < 2) {
    return new R(str[0]);
  }
  let i = 2;
  let res = '';
  while (i < 4) { // complex key length is always a maximum of three unless unicode changes
    const comp = obj[str.slice(0, i)];
    if (comp) {
      res = Character(comp);
      break;
    }
    i++;
  }
  return new R(res, str.slice(i));
};
// default @ComposeFunction: T:>...ComplexMap => T:>Array[Character] => Result
