import assertChar from './assertChar';
import { complex, irregular } from './unicode/complex';

export function* composeComplex(includeIrregular = false) {
  let objList = [complex];
  if (includeIrregular) {
    objList.push(irregular);
  }
  while (true) {
    const currentChar = yield true;
    assertChar(currentChar);
    const currentCharObj = objList.map(obj => obj[currentChar]).filter(v => v);
    if (!currentCharObj.length) {
      if (typeof objList[0] === 'string') {
        return objList[0];
      }
      return objList[0].$;
    }
    objList = currentCharObj;
  }
}
